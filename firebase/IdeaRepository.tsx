import { firebase } from "@react-native-firebase/functions";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { get, isEmpty, map, forEach, set, findIndex } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { remove, startsWith } from 'lodash';

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
        Sentry.captureException(`loadIdeaFromId: ${ex}`);
    }
}

export const loadIdeaByIds = async (ids) => {
    if(!ids){
        return null;
    }

    try{
        const promises = map(ids, async id => await firestore().collection('ideas').doc(id).get());

        const docs = await Promise.all(promises);

        return map(docs, doc => ({id: doc.id, ...doc.data()}));
    }catch(ex){
        Sentry.captureException(`loadIdeaByIds: ${ex}`);
    }
}

export const removeIdea = async (id) => {
    if(!id){
        return null;
    }

    try{
        await firestore().collection('ideas').doc(id)
        .update({isActive: false, updatedAt: firestore.FieldValue.serverTimestamp()});
    }catch(ex){
        Sentry.captureException(`removeIdea: ${ex}`);
    }
}

export const removeIdeaComment = async (ideaId, commentId) => {
    if(!ideaId || !commentId){
        return null;
    }

    try{
        await firestore().collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId)
        .update({isActive: false, updatedAt: firestore.FieldValue.serverTimestamp()});        
    }catch(ex){
        Sentry.captureException(`removeIdeaComment: ${ex}`);
    }
}

export async function addNewIdea(idea, owner){
    try{
        const addNewIdea = firebase.functions().httpsCallable('addNewIdea');

        const {images} = idea;
        console.log(idea);

        if(!isEmpty(images)){
            const ownerId = idea.ownerId;

            const imagePaths = map(images.urls, url => {
                const uuid = uuidv4();
    
                return `/images/${ownerId}/ideas/${uuid}.jpg`;
            })

            const downloadUrls = await uploadImages(images.urls, imagePaths);

            set(images, 'urls', downloadUrls);
        }

        const ret = await addNewIdea({idea: {...idea, images, owner}});

        if(get(ret, 'data.ret')){
            return true;
        }
    }catch(ex){
        Sentry.captureException(`addNewIdea: ${ex}`);
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
        Sentry.captureException(`addIdeasListenner: ${error}`);
    }

    return firestore().collection('ideas').orderBy('createdAt', 'desc').onSnapshot(onResult, onError);
}

export async function getPickedIdeas(uid){
    try{
        const ret = await firestore().collection('history').doc(uid).collection('picked').get();
        return map(ret.docs, doc => doc.data().ideaId);
    }catch(ex){
        Sentry.captureException(`getPickedIdeas: ${error}`);
    }
}

export async function addIdeaListenner(ideaId, dispatch){
    
    function onResult(doc) {
        dispatch(setCurrentIdea({id: doc.id, ...doc.data()}));
    }
      
    function onError(error) {
        Sentry.captureException(`addIdeaListenner: ${error}`);
    }

    return firestore().collection('ideas').doc(ideaId).onSnapshot(onResult, onError);
}

export async function editIdeaComment({ideaId, commentId, historyCommentId, ownerId, commentDoc, imageUris}){
    console.log('editIdeaComment', ideaId, commentId, ownerId, historyCommentId);

    if(!ideaId || !ownerId || !commentId) return false;


    const { avgRating, practicalityRate, creativityRate, valuableRate } = commentDoc;

    const batch = firestore().batch();

    try{
        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        if(!ideaDoc.exists){
            return -1;
        }

        //this one is for editting comment (which some images were uploaded to firebase)
        const uploadedFirebaseImages = remove(imageUris, (image:string) => startsWith(image, 'https'));

        const imagePaths = map(imageUris, uri => {
            const uuid = uuidv4();

            return `/images/${owner.uid}/ideas/comments/${uuid}.png`;
        })

        const imageUrls =  await uploadImages(imageUris, imagePaths);

        const doc = {
            ...commentDoc,
            ideaId,
            isActive: true,
            images: [...imageUrls, ...uploadedFirebaseImages],
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }

        const { rating } = ideaDoc.data();

        remove(rating, rate => rate.uid === ownerId);
        rating.push({ avgRating, practicalityRate, creativityRate, valuableRate, uid: ownerId })

        batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                rating,
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        batch.update(firestore().collection('ideas').doc(ideaId).collection('comments').doc(commentId), doc);

        batch.update(
            firestore().collection('history').doc(ownerId).collection('comments').doc(historyCommentId),
            {
                comment: commentDoc,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
        );

        await batch.commit();
        return 1;
    }catch(ex){
        Sentry.captureException(`editIdeaComment: ${ex}`);
        return 0;
    }
}

export async function addCommentToIdea({ideaId, owner, commentDoc, imageUris}){

    if(!ideaId || !owner) return false;

    console.log(ideaId, owner, commentDoc);

    const { avgRating, practicalityRate, creativityRate, valuableRate } = commentDoc;

    const batch = firestore().batch();

    try{
        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        if(!ideaDoc.exists){
            return -1;
        }
        const ideaData = ideaDoc.data();

        //this one is for editting comment (which some images were uploaded to firebase)
        const uploadedFirebaseImages = remove(imageUris, (image:string) => startsWith(image, 'https'));

        const imagePaths = map(imageUris, uri => {
            const uuid = uuidv4();

            return `/images/${owner.uid}/ideas/comments/${uuid}.png`;
        })

        const imageUrls =  await uploadImages(imageUris, imagePaths);

        const doc = {
            ...commentDoc,
            ideaId,
            owner,
            isActive: true,
            images: [...imageUrls, ...uploadedFirebaseImages],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }

        batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                commentCount: firestore.FieldValue.increment(1),
                rating: firestore.FieldValue.arrayUnion({ avgRating, practicalityRate, creativityRate, valuableRate, uid: owner.uid }),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        batch.set(firestore().collection('ideas').doc(ideaId).collection('comments').doc(), doc);

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
        return 1;
    }catch(ex){
        Sentry.captureException(`addCommentToIdea: ${ex}`);
        return 0;
    }
}

export async function addReplyToComment({ideaId, owner, commentId, reply}){

    try{
        console.log(reply, owner)

        const doc = {
            reply,
            owner,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
        }

        await firestore()
        .collection('ideas').doc(ideaId)
        .collection('comments').doc(commentId)
        .collection('replies').add(doc);

        return true;
    }catch(ex){
        Sentry.captureException(`addReplyToComment: ${ex}`);
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
        Sentry.captureException(`addIdeaCommentsListenner: ${error}`);
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
        Sentry.captureException(`addCommentRepliestListenner: ${error}`);
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
        Sentry.captureException(`getIdeaCommentReplies: ${ex}`);
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
        return true;
    }catch(ex){
        Sentry.captureException(`likeIdea: ${ex}`);
    }
    return false;
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
        Sentry.captureException(`likeIdeaComment: ${ex}`);
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
        Sentry.captureException(`pickAnIdea: ${ex}`);
    }

    return false;
}

export const acceptPicking = async ({uid, ideaId, commentId, notificationId}) => {
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
        picks[index].status = 'ACCEPTED_TO_PICK'

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
                pickStatus: 'ACCEPTED_TO_PICK',
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.set(
            firestore().collection('history').doc(owner.uid).collection('picked').doc(),
            {
                ...commentDoc.data(),
                pickStatus: 'ACCEPTED_TO_PICK',
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

        batch.update(
            firestore().collection('users').doc(uid).collection('notifications').doc(notificationId),
            {
                updatedAt: firestore.FieldValue.serverTimestamp(),
                unRead: false
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        Sentry.captureException(`pickAnIdea accept: ${ex}`);
    }

    return false;
}

export const rejectPicking = async ({uid, ideaId, commentId, notificationId}) => {
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
        picks[index].status = 'REJECTED_TO_PICK'

        await batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                picks,
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        batch.set(
            firestore().collection('users').doc(uid).collection('notifications').doc(notificationId),
            {
                updatedAt: firestore.FieldValue.serverTimestamp(),
                unRead: false
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        Sentry.captureException(`pickAnIdea reject: ${ex}`);
    }

    return false;
}

export const deleteIdeaById = async (ideaId) => {
    if(!ideaId){
        return null;
    }

    try{
        await firestore().collection('ideas').doc(ideaId).delete();
    }catch(ex){
        Sentry.captureException(`deleteIdeaById: ${ex}`);
        return false;
    }
    return true;
}

export const deleteIdeaComment = async ({ownerUid, historyCommentId, ideaId, ideaCommentId}) => {
    if(!ideaId){
        return null;
    }

    const batch = firestore().batch();

    try{

        const ideaDoc = await firestore().collection('ideas').doc(ideaId).get();
        const { rating } = ideaDoc.data();

        remove(rating, rate => rate.uid === ownerUid);

        batch.delete(firestore().collection('ideas').doc(ideaId).collection('comments').doc(ideaCommentId));
        batch.delete(firestore().collection('history').doc(ownerUid).collection('comments').doc(historyCommentId));

        batch.update(
            firestore().collection('ideas').doc(ideaId),
            {
                rating,
                commentCount: firestore.FieldValue.increment(-1),
                updatedAt: firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.commit();
    }catch(ex){
        Sentry.captureException(`loadIdeaFromId reject: ${ex}`);
        return false;
    }
    return true;
}