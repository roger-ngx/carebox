import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

import { map, isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { setBulletinBoards, setBulletinBoardComments, setCurrentBulletinItem } from '../stores/slices/bulletinSlice';

const uploadImages = async (imageFileUris, imageFirestorePaths) => {
    if(!isEmpty(imageFileUris) || !isEmpty(imageFirestorePaths)){

        const promises = map(imageFileUris, async (uri, index) => await storage().ref(imageFirestorePaths[index]).putFile(uri))
        await Promise.all(promises);
        
        const downloadUrlPromises = map(imageFirestorePaths, async path => await storage().ref(path).getDownloadURL())
        return await Promise.all(downloadUrlPromises);
    }

    return [];
}

export async function addBulletinItem({owner, type, content, imageUris}){

    try{
        const imagePaths = map(imageUris, uri => {
            const uuid = uuidv4();

            return `/images/${owner.uid}/ideas/comments/${uuid}.png`;
        })

        const imageUrls =  await uploadImages(imageUris, imagePaths);

        firestore().collection('bulletinBoards').doc().set({
            type, content,
            ownerId: owner.uid,
            owner,
            isAvailable: true,
            images: imageUrls,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp()
        })

        return true;
    }catch(ex){
        console.log('addBulletinItem', ex);
        return false;
    }
}

export async function getRegisteredBulletinItems(uid){
    try{
        console.log('uid', uid);

        const ret = await firestore().collection('bulletinBoards')
        .where('ownerId', '==', uid)
        .orderBy('createdAt', 'desc')
        .get();
        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}))
    }catch(ex){
        Sentry.captureException(`getRegisteredBulletinItems: ${ex}`);
    }
}

export async function getBulletinItemById(id){
    try{
        if(!id) return null;

        const doc = await firestore().collection('bulletinBoards')
        .doc(id).get();

        return ({id: doc.id, ...doc.data()});
    }catch(ex){
        Sentry.captureException(`getBulletinItemById: ${ex}`);
    }
}

export async function getRegisteredBulletinComments(uid){
    try{
        console.log('uid', uid);

        const ret = await firestore().collection('history')
        .doc(uid).collection('bulletinComments')
        .orderBy('updatedAt', 'desc')
        .get();
        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}))
    }catch(ex){
        Sentry.captureException(`getRegisteredBulletinComments reject: ${ex}`);
    }
}

export async function addBulletinBoardsListenner(dispatch){
    
    function onResult(querySnapshot) {
        const docs = querySnapshot.docs;
        const ideas = map(docs, doc => ({id: doc.id, ...doc.data()}))
        dispatch(setBulletinBoards(ideas));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore().collection('bulletinBoards').orderBy('createdAt', 'desc').onSnapshot(onResult, onError);
}

export async function onSubmitBulletinItemComment({bulletinItemId, comment, owner}){

    if(!bulletinItemId || !comment || !owner){
        return;
    }

    console.log('owner', owner);

    const batch = firestore().batch();
    try{
        batch.set(
            firestore().collection('bulletinBoards').doc(bulletinItemId).collection('comments').doc(), 
            {
                bulletinItemId,
                comment,
                owner,
                isAvailable: true,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        batch.update(
            firestore().collection('bulletinBoards').doc(bulletinItemId),
            {
                commentCount: firebase.firestore.FieldValue.increment(1),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            }
        )

        // batch.set(
        //     firestore().collection('users').doc(owner.uid).collection('bulletinComments').doc(), 
        //     {
        //         bulletinItemId,
        //         comment,
        //         owner,
        //         createdAt: firestore.FieldValue.serverTimestamp(),
        //         updatedAt: firestore.FieldValue.serverTimestamp()
        //     }
        // )

        await batch.commit();

        return true;
    }catch(ex){
        console.log('onSubmitBulletinItemComment', ex);
        return false;
    }
}

export async function likeBulletinItem(bulletinItemId, userId){

    if(!bulletinItemId || !userId){
        return;
    }

    const batch = firestore().batch();
    try{
        batch.update(
            firestore().collection('bulletinBoards').doc(bulletinItemId),
            {
                likes: firebase.firestore.FieldValue.arrayUnion(userId),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        console.log('onSubmitBulletinItemComment', ex);
        return false;
    }
}

export async function unlikeBulletinItem(bulletinItemId, userId){

    if(!bulletinItemId || !userId){
        return;
    }

    const batch = firestore().batch();
    try{
        batch.update(
            firestore().collection('bulletinBoards').doc(bulletinItemId),
            {
                likes: firebase.firestore.FieldValue.arrayRemove(userId),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        console.log('onSubmitBulletinItemComment', ex);
        return false;
    }
}

export async function addBulletinItemCommentsListenner(id, dispatch){
    
    function onResult(querySnapshot) {
        const docs = querySnapshot.docs;
        const comments = map(docs, doc => ({id: doc.id, ...doc.data()}))
        dispatch(setBulletinBoardComments(comments));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore().collection('bulletinBoards').doc(id).collection('comments').orderBy('createdAt', 'desc').onSnapshot(onResult, onError);
}

export async function addBulletinItemListenner(id, dispatch){
    
    function onResult(doc) {
        dispatch(setCurrentBulletinItem({id: doc.id, ...doc.data()}));
    }
      
    function onError(error) {
        console.error(error);
    }

    return firestore().collection('bulletinBoards').doc(id).onSnapshot(onResult, onError);
}

export const deleteBulletinComment = async ({uid, historyBulletinItemId, bulletinItemId, commentId}) => {
    console.log(uid, historyBulletinItemId, bulletinItemId, commentId);
    
    const batch = firestore().batch();

    try{
        batch.delete(firestore().collection('bulletinBoards').doc(bulletinItemId).collection('comments').doc(commentId));
        batch.delete(firestore().collection('history').doc(uid).collection('bulletinComments').doc(historyBulletinItemId));

        batch.update(
            firestore().collection('bulletinBoards').doc(bulletinItemId),
            {
                commentCount: firestore.FieldValue.increment(-1),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.commit();
    }catch(ex){
        Sentry.captureException(`deleteBulletinComment: ${ex}`);
        return false;
    }

    return true;
}

export const deleteBulletinItemById = async (postId) => {
    
    const batch = firestore().batch();

    try{
        batch.delete(firestore().collection('bulletinBoards').doc(postId));
        await batch.commit();
    }catch(ex){
        Sentry.captureException(`deleteBulletinComment: ${ex}`);
        return false;
    }

    return true;
}