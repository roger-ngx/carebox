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
            isActive: true,
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
        console.log('getRegisteredBulletinItems', ex);
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
                isActive: true,
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

        batch.set(
            firestore().collection('users').doc(owner.uid).collection('bulletinComments').doc(), 
            {
                bulletinItemId,
                comment,
                owner,
                isActive: true,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

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