
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage, { firebase } from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { map, isEmpty } from 'lodash';
import * as SecureStore from 'expo-secure-store';
import { setUserProfileData, setUserNotifications, setUserRegisteredComments } from '../stores/slices/userSlice';
import { v4 as uuidv4 } from 'uuid';

export async function checkNicknameExists(nickName){
    const checkNicknameExists = functions().httpsCallable('checkNicknameExists');
    return await checkNicknameExists({nickName});
}

export async function updateUserInfo({uid, profileImageUri, userInfo}){
    try{
        let profileImageUrl = null;

        if(!!profileImageUri && profileImageUri.startsWith('file://')){

            const uuid = uuidv4();
            const imagePath = `/profiles/${uuid}.jpg`;

            await storage().ref(imagePath).putFile(profileImageUri)
            
            profileImageUrl = await storage().ref(imagePath).getDownloadURL();
            console.log(profileImageUrl)
        }
    
        await firestore().collection('users').doc(uid).update({
            ...userInfo,
            profileImageUrl,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        return true;
    }catch(ex){
        Sentry.captureException(`updateUserInfo: ${ex}`);
    }
    return false;
}

export async function signUp({uid, nickName, gender, department, yearsOnJob, phoneNumber}){
    try{
        const signUp = functions().httpsCallable('signUp');
        const ret = await signUp({
            uid, nickName, gender, department, yearsOnJob, phoneNumber
        })
        console.log(ret);
        const { authToken } = ret.data;

        if(authToken){
            await auth().signInWithCustomToken(authToken);
            await SecureStore.setItemAsync('userToken', authToken);
            return true;
        }
    }catch(ex){
        Sentry.captureException(`signUp: ${ex}`);
    }
    return false;
}

//+82
export async function login(phoneNumber){
    if(isEmpty(phoneNumber)) return;

    try{
        const login = functions().httpsCallable('login');
        const {data} = await login({phoneNumber});

        const { uid, authToken} = data;

        if(uid && authToken){
            await auth().signInWithCustomToken(authToken);
            await SecureStore.setItemAsync('userToken', authToken);
            return uid;
        }
    }catch(ex){
        Sentry.captureException(`login: ${ex}`);
    }
    return null;
}

export async function subscribeForUserInformation(userId, dispatch){
    function onResult(doc) {
        console.log('Got User data.');

        const userData = {uid: doc.id, ...doc.data()};

        dispatch(setUserProfileData(userData));
    }
        
    function onError(error) {
        Sentry.captureException(`subscribeForUserInformation: ${error}`);
    }

    return firestore().collection('users').doc(userId).onSnapshot(onResult, onError);    
}

export async function subscribeForNotifications(userId, dispatch){
    function onResult(snapShot) {
        console.log('Got User notifications data.');

        const userData = map(snapShot.docs, doc => ({id: doc.id, ...doc.data()}));

        dispatch(setUserNotifications(userData));
    }
        
    function onError(error) {
        Sentry.captureException(`subscribeForUserInformation: ${error}`);
    }

    return firestore().collection('users').doc(userId).collection('notifications').onSnapshot(onResult, onError);    
}

export async function markReadingNotification({uid, notificationId}){
    try{
        console.log(uid, notificationId);

        await firestore().collection('users').doc(uid)
        .collection('notifications').doc(notificationId)
        .update({
            unRead: false,
            updatedAt: firestore.FieldValue.serverTimestamp()
        });    
    }catch(ex){
        Sentry.captureException(`markReadingNotification: ${ex}`);
    }
}

export async function updateUserPushToken(userId, pushToken){
    if(!userId) return false;
    try{
        await firestore().collection('users').doc(userId)
        .update({
            fcmToken: pushToken,
            updatedAt: firestore.FieldValue.serverTimestamp()
        })
        return true;
    }catch(ex){
        Sentry.captureException(`updateUserPushToken: ${ex}`);
    }
    return false;
}

export async function requestPushNotificationPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      Sentry.captureException(`Authorization status: ${authStatus}`);
    }
}

export async function getLikedIdeas(uid){
    try{
        console.log('uid', uid);

        const ret = await firestore().collection('history').doc(uid).collection('likes').get();
        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}))
    }catch(ex){
        Sentry.captureException(`getLikedIdeas: ${ex}`);
    }
}

export async function getUserAuthToken(uid){
    if(!uid) return null;

    try{

        const ret = await firestore().collection('users')
        .doc(uid)
        .get();

        if(ret.exists){
            return ret.data().authToken;
        }
    }catch(ex){
        Sentry.captureException(`getUserAuthToken: ${ex}`);
    }
    return null;
}

export async function getRegisteredIdeas(uid){
    try{
        console.log('uid', uid);

        const ret = await firestore().collection('ideas')
        .where('ownerId', '==', uid)
        .orderBy('createdAt', 'desc')
        .get();
        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}))
    }catch(ex){
        Sentry.captureException(`getRegisteredIdeas: ${ex}`);
    }
}

export async function getRegisteredComments(uid){
    try{
        console.log('uid', uid);

        const ret = await firestore().collection('history').doc(uid).collection('comments').get();
        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}))
    }catch(ex){
        Sentry.captureException(`getRegisteredComments: ${ex}`);
    }
}

export async function subscribeForRegisteredComments(uid, dispatch){

    function onResult(snapshot) {
        console.log('Got registerd comments.');

        const registeredComments = map(snapshot.docs, doc => ({id: doc.id, ...doc.data()}))

        dispatch(setUserRegisteredComments(registeredComments));
    }
        
    function onError(error) {
        Sentry.captureException(`subscribeForRegisteredComments: ${error}`);
    }

    return firestore().collection('history').doc(uid).collection('comments').onSnapshot(onResult, onError);
} 

export async function signOut(){
    try{
        await auth().signOut();
        await SecureStore.deleteItemAsync('userToken');
        return true;
    }catch(ex){
        Sentry.captureException(`signOut: ${ex}`);
    }
    return false;
}

export async function withdraw(uid){
    console.log('withdraw', uid);
    if(!uid) return false;
    try{

        const withdrawUser = functions().httpsCallable('withdrawUser');
        const {data} = await withdrawUser({uid});

        console.log('data', data);

        if(data && data.ret){
            await SecureStore.deleteItemAsync('userToken');
            return true;
        }
    }catch(ex){
        Sentry.captureException(`withdraw: ${ex}`);
    }
    return false;
}

