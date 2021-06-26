import { firebase } from "@react-native-firebase/functions";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { get, isEmpty, map, forEach, set } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { setIdeas } from "../stores/slices/userSlice";
import { setComments } from "../stores/slices/ideaSlice";

const uploadImages = async (imageFileUris, imageFirestorePaths) => {
    if(!isEmpty(imageFileUris) || !isEmpty(imageFirestorePaths)){

        const promises = map(imageFileUris, async (uri, index) => await storage().ref(imageFirestorePaths[index]).putFile(uri))
        await Promise.all(promises);
        
        const downloadUrlPromises = map(imageFirestorePaths, async path => await storage().ref(path).getDownloadURL())
        return await Promise.all(downloadUrlPromises);
    }

    return [];
}

export async function addNewIdea(idea){
    try{
        const addNewIdea = firebase.functions().httpsCallable('addNewIdea');

        const images = idea.images;
        if(!isEmpty(images)){
            const ownerId = idea.ownerId;

            const imagePaths = map(images, image => {
                const uuid = uuidv4();
    
                return `/images/${ownerId}/ideas/${uuid}.jpg`;
            })

            const downloadUrls = await uploadImages(map(images, image => image.url), imagePaths);

            forEach(downloadUrls, (url, index) => set(images, `${index}.url`, url))
        }

        const ret = await addNewIdea({...idea, images});

        if(get(ret, 'data.ret')){
            return true;
        }
    }catch(ex){
        console.log('addNewIdea', ex);
    }
    return false;
}

export async function addIdeasListenner(dispatch){
    
    function onResult(querySnapshot) {
        console.log('Got Users collection result.');
        const docs = querySnapshot.docs;
        const ideas = map(docs, doc => ({id: doc.id, ...doc.data()}))
        dispatch(setIdeas(ideas));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore().collection('ideas').orderBy('createdAt', 'desc').onSnapshot(onResult, onError);
}

export async function addCommentToIdea({ideaId, ownerId, commentDoc, imageUris}){

    if(!ideaId || !ownerId) return;

    console.log(ideaId, ownerId, commentDoc);

    try{
        const imagePaths = map(imageUris, uri => {
            const uuid = uuidv4();

            return `/images/${ownerId}/ideas/comments/${uuid}.png`;
        })

        const imageUrls =  await uploadImages(imageUris, imagePaths);

        const doc = {
            ...commentDoc,
            images: imageUrls,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }

        await firestore().collection('ideas').doc(ideaId).collection('comments').add(doc);
    }catch(ex){
        console.log('addCommentToIdea', ex);
    }
}

export async function addCommentToComment({ideaId, owner, commentId, commentData}){

    try{
        const doc = {
            ...commentData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }

        await firestore()
        .collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId)
        .collection('comments').add(doc);
    }catch(ex){
        console.log('addCommentToIdea', ex);
    }
}

export function addIdeaCommentsListenner(ideaId, dispatch){
    
    function onResult(querySnapshot) {
        console.log('Got Users collection result.');
        const docs = querySnapshot.docs;
        const comments = map(docs, doc => ({id: doc.id, ...doc.data()}))

        console.log('comments', comments);

        dispatch(setComments(comments));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore()
    .collection('ideas').doc(ideaId)
    .collection('comments').orderBy('createdAt', 'desc')
    .onSnapshot(onResult, onError);
}