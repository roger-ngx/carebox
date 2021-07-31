
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage, { firebase } from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { map } from 'lodash';
import * as SecureStore from 'expo-secure-store';
import { setUserProfileData, setUserNotifications } from '../stores/slices/userSlice';
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
        console.log('updateUserInfo', ex);
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
        console.log('signUp', ex);
    }
    return false;
}

export async function subscribeForUserInformation(userId, dispatch){
    try{
        function onResult(doc) {
            console.log('Got User data.');

            const userData = {uid: doc.id, ...doc.data()};

            dispatch(setUserProfileData(userData));
        }
          
        function onError(error) {
            console.error(error);
        }
    
        return firestore().collection('users').doc(userId).onSnapshot(onResult, onError);    
    }catch(ex){
        console.log('subscribeForUserInformation', ex);
    }
}

export async function subscribeForNotifications(userId, dispatch){
    try{
        function onResult(snapShot) {
            console.log('Got User notifications data.');

            const userData = map(snapShot.docs, doc => ({id: doc.id, ...doc.data()}));

            dispatch(setUserNotifications(userData));
        }
          
        function onError(error) {
            console.error(error);
        }
    
        return firestore().collection('users').doc(userId).collection('notifications').onSnapshot(onResult, onError);    
    }catch(ex){
        console.log('subscribeForUserInformation', ex);
    }
}

export async function markReadingNotification(uid, notificationId){
    try{
        console.log(uid, notificationId);

        await firestore().collection('users').doc(uid)
        .collection('notifications').doc(notificationId)
        .update({
            unRead: false,
            updatedAt: firestore.FieldValue.serverTimestamp()
        });    
    }catch(ex){
        console.log('markReadingNotification', ex);
    }
}

export async function updateUserPushToken(userId, pushToken){
    try{
        await firestore().collection('users').doc(userId)
        .update({
            fcmToken: pushToken,
            updatedAt: firestore.FieldValue.serverTimestamp()
        })
        return true;
    }catch(ex){
        console.log('updateUserPushToken', ex);
    }
    return false;
}

export async function requestPushNotificationPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
}

export async function getLikedIdeas(uid){
    try{
        console.log('uid', uid);

        const ret = await firestore().collection('history').doc(uid).collection('likes').get();
        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}))
    }catch(ex){
        console.log('getLikedIdeas', ex);
    }
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
        console.log('getLikedIdeas', ex);
    }
}

export async function getRegisteredComments(uid){
    try{
        console.log('uid', uid);

        const ret = await firestore().collection('history').doc(uid).collection('comments').get();
        return map(ret.docs, doc => ({id: doc.id, ...doc.data()}))
    }catch(ex){
        console.log('getLikedIdeas', ex);
    }
} 

export async function signOut(){
    try{
        await auth().signOut();
        await SecureStore.deleteItemAsync('userToken');
        return true;
    }catch(ex){
        console.log('logOut', ex);
    }
    return false;
}

