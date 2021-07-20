import { firebase } from "@react-native-firebase/functions";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { get, isEmpty, map, forEach, set, findIndex } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { setIdeas } from "../stores/slices/userSlice";
import { setComments, setCommentReplies, setCurrentIdea } from "../stores/slices/ideaSlice";

const uploadImages = async (imageFileUris, imageFirestorePaths) => {
    if(!isEmpty(imageFileUris) || !isEmpty(imageFirestorePaths)){

        const promises = map(imageFileUris, async (uri, index) => await storage().ref(imageFirestorePaths[index]).putFile(uri))
        await Promise.all(promises);
        
        const downloadUrlPromises = map(imageFirestorePaths, async path => await storage().ref(path).getDownloadURL())
        return await Promise.all(downloadUrlPromises);
    }

    return [];
}

export const loadIdeaFromId = async (ideaId) => {
    if(!ideaId){
        return null;
    }

    try{
        const doc = await firestore().collection('users').doc(ideaId).get();
        return ({id: doc.id, ...doc.data()})
    }catch(ex){
        console.log('loadIdeaFromId', ex);
    }
}

export async function addNewIdea(idea, owner){
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

        const ret = await addNewIdea({idea: {...idea, images, owner}});

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
        console.log('Got ideas collection result.');
        const docs = querySnapshot.docs;
        const ideas = map(docs, doc => ({id: doc.id, ...doc.data()}))
        dispatch(setIdeas(ideas));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore().collection('ideas').orderBy('createdAt', 'desc').onSnapshot(onResult, onError);
}

export async function addIdeaListenner(ideaId, dispatch){
    
    function onResult(doc) {
        dispatch(setCurrentIdea({id: doc.id, ...doc.data()}));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore().collection('ideas').doc(ideaId).onSnapshot(onResult, onError);
}

export async function addCommentToIdea({ideaId, owner, commentDoc, imageUris}){

    if(!ideaId || !owner) return false;

    console.log(ideaId, owner, commentDoc);

    const { avgRating, practicalityRate, creativityRate, valuableRate } = commentDoc;

    const batch = firestore().batch();

    try{
        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        if(!ideaDoc.exists){
            return false;
        }

        const imagePaths = map(imageUris, uri => {
            const uuid = uuidv4();

            return `/images/${owner.uid}/ideas/comments/${uuid}.png`;
        })

        const imageUrls =  await uploadImages(imageUris, imagePaths);

        const doc = {
            ...commentDoc,
            owner,
            images: imageUrls,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }

        batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                commentCount: firestore.FieldValue.increment(1),
                rating: firestore.FieldValue.arrayUnion({ avgRating, practicalityRate, creativityRate, valuableRate }),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        batch.set(firestore().collection('ideas').doc(ideaId).collection('comments').doc(), doc);

        batch.set(
            firestore().collection('history').doc(owner.uid).collection('comments').doc(ideaId),
            {
                ideaId: ideaDoc.id,
                comment: doc
            }
        )

        const ideaData = ideaDoc.data();

        //inform to the idea's owner a new comment 
        batch.set(
            firestore().collection('users').doc(ideaData.ownerId).collection('notifications').doc(),
            {
                ideaId,
                type: 'NEW_COMMENT',
                commentUser: owner,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.commit();
        return true;
    }catch(ex){
        console.log('addCommentToIdea', ex);
        return false;
    }
}

export async function addReplyToComment({ideaId, owner, parentCommentId, comment}){

    try{
        const doc = {
            comment,
            owner,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
        }

        await firestore()
        .collection('ideas').doc(ideaId)
        .collection('comments').doc(parentCommentId)
        .collection('replies').add(doc);

        return true;
    }catch(ex){
        console.log('addCommentToIdea', ex);
    }

    return false;
}

export function addIdeaCommentsListenner(ideaId, dispatch){
    console.log('idea id', ideaId);
    
    function onResult(querySnapshot) {
        const docs = querySnapshot.docs;
        console.log('Got idea comments collection result.', docs.length);
        const comments = map(docs, doc => ({id: doc.id, ...doc.data()}))

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

export function addCommentRepliestListenner({ideaId, commentId, dispatch}){

    console.log(ideaId, commentId, dispatch)
    
    function onResult(querySnapshot) {
        console.log('Got comment replies collection result.');
        const docs = querySnapshot.docs;
        const replies = map(docs, doc => ({id: doc.id, ...doc.data()}))

        console.log('comments', replies);

        dispatch(setCommentReplies(replies));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore()
    .collection('ideas').doc(ideaId)
    .collection('comments').doc(commentId)
    .collection('replies').orderBy('createdAt', 'desc')
    .onSnapshot(onResult, onError);
}

export const getIdeaCommentReplies = async (ideaId, commentId) => {
    try{
        const replies = await firestore()
        .collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId)
        .collection('replies').orderBy('createdAt', 'desc').get();

        if(replies.docs.length){
            const lastDoc = replies.docs[0];
            return { count: replies.docs.length, lastReply: {id: lastDoc.id, ...lastDoc.data()} }
        } else {
            return {};
        }
    }catch(ex){
        console.log('getIdeaCommentsOfComment', ex)
    }
}

export async function likeIdea({ideaId, uid, isLike}){
    const batch = firestore().batch();

    try{

        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        if(!ideaDoc.exists){
            return;
        }

        await batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                likes: isLike ? firestore.FieldValue.arrayUnion(uid) : firestore.FieldValue.arrayRemove(uid),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        isLike ? await batch.set(
            firestore().collection('history').doc(uid).collection('likes').doc(ideaId),
            {
                ...ideaDoc.data()
            }
        ) :
        await batch.delete(firestore().collection('history').doc(uid).collection('likes').doc(ideaId))

        await batch.commit();
    }catch(ex){
        console.log('likeIdea', ex);
    }
}

export async function likeIdeaComment({ideaId, commentId, uid, isLike}){
    const batch = firestore().batch();

    try{

        const commentDoc = await firestore().collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId).get();

        if(!commentDoc.exists){
            return;
        }

        await batch.update(
            firestore().collection('ideas').doc(ideaId).collection('comments').doc(commentId),
            {
                likes: isLike ? firestore.FieldValue.arrayUnion(uid) : firestore.FieldValue.arrayRemove(uid),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        isLike ? await batch.set(
            firestore().collection('history').doc(uid).collection('commentLikes').doc(commentId),
            {
                ...commentDoc.data()
            }
        ) :
        await batch.delete(firestore().collection('history').doc(uid).collection('likes').doc(ideaId).collection('comments').doc(commentId))

        await batch.commit();
    }catch(ex){
        console.log('likeIdea', ex);
    }   
}

export const pickAnIdea = async ({uid, ideaId, commentId}) => {
    const batch = firestore().batch();

    try{

        const commentDoc = await firestore().collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId).get();

        if(!commentDoc.exists){
            return;
        }

        const commentData = commentDoc.data();

        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        const ideaData = ideaDoc.data();

        await batch.update(
            firestore().collection('ideas').doc(ideaId).collection('comments').doc(commentId),
            {
                pickStatus: 'ASKED_FOR_PICK',
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                picks: firestore.FieldValue.arrayUnion({...commentData.owner, status: 'ASKED_FOR_PICK'}),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        // await batch.set(
        //     firestore().collection('history').doc(uid).collection('picked').doc(),
        //     {
        //         ...commentDoc.data(),
        //         createdAt: firestore.FieldValue.serverTimestamp(),
        //         updatedAt: firestore.FieldValue.serverTimestamp()
        //     }
        // )

        //inform to the idea's owner a new comment 
        batch.set(
            firestore().collection('users').doc(commentData.owner.uid).collection('notifications').doc(),
            {
                ideaId,
                type: 'ASKED_FOR_PICK',
                ideaOwner: ideaData.owner,
                comment: {id: commentId, ...commentData},
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp(),
                unRead: true
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        console.log('pickAnIdea', ex);
    }

    return false;
}

export const acceptPicking = async ({uid, ideaId, commentId}) => {
    const batch = firestore().batch();

    try{

        const commentDoc = await firestore().collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId).get();

        if(!commentDoc.exists){
            return;
        }

        const commentData = commentDoc.data();

        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        const ideaData = ideaDoc.data();

        await batch.update(
            firestore().collection('ideas').doc(ideaId).collection('comments').doc(commentId),
            {
                pickStatus: 'ACCEPTED_TO_PICK',
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        const { owner, picks } = ideaData;

        const index = findIndex(picks, pick => pick.uid === uid);
        picks[index].type = 'ACCEPTED_TO_PICK'

        await batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                picks,
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.set(
            firestore().collection('history').doc(uid).collection('picked').doc(),
            {
                ...commentDoc.data(),
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        //inform to the idea's owner 
        batch.set(
            firestore().collection('users').doc(owner.uid).collection('notifications').doc(),
            {
                ideaId,
                type: 'ACCEPTED_TO_PICK',
                commentOwner: commentData.owner,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp(),
                unRead: true
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        console.log('pickAnIdea accept', ex);
    }

    return false;
}

export const rejectPicking = async ({uid, ideaId, commentId}) => {
    const batch = firestore().batch();

    try{

        const commentDoc = await firestore().collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId).get();

        if(!commentDoc.exists){
            return;
        }

        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        const ideaData = ideaDoc.data();

        await batch.update(
            firestore().collection('ideas').doc(ideaId).collection('comments').doc(commentId),
            {
                pickStatus: 'REJECTED_TO_PICK',
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        const { picks } = ideaData;

        const index = findIndex(picks, pick => pick.uid === uid);
        picks[index].type = 'REJECTED_TO_PICK'

        await batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                picks,
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        console.log('pickAnIdea reject', ex);
    }

    return false;
}