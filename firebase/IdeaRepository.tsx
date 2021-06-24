import { firebase } from "@react-native-firebase/functions";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { get, isEmpty, map, forEach, set } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { setIdeas } from "../stores/slices/userSlice";
import { setComments } from "../stores/slices/ideaSlice";

export async function addNewIdea(idea){
    try{
        const addNewIdea = firebase.functions().httpsCallable('addNewIdea');

        const images = idea.images;
        if(!isEmpty(images)){
            const ownerId = idea.ownerId;

            const imagePaths = map(images, image => {
                const uuid = uuidv4();
    
                return `/images/${ownerId}/ideas/${uuid}.png`;
            })


            const promises = map(images, async (image, index) => await storage().ref(imagePaths[index]).putFile(image.url))
            await Promise.all(promises);
            
            const downloadUrlPromises = map(imagePaths, async path => await storage().ref(path).getDownloadURL())
            const downloadUrls = await Promise.all(downloadUrlPromises);

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

export async function addCommentToIdea(ideaId, commentDoc){

    if(!ideaId) return;

    const doc = {
        ...commentDoc,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    try{
        await firestore().collection('ideas').doc(ideaId).collection('comments').add(doc);
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