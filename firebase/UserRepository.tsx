
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { setUserProfileData } from '../stores/slices/userSlice';
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
            profileImageUrl
        })

        return true;
    }catch(ex){
        console.log('updateUserInfo', ex);
    }
    return false;
}

export async function signUp({uid, nickName, gender, department, yearsOnJob}){
    try{
        const signUp = functions().httpsCallable('signUp');
        const ret = await signUp({
            uid, nickName, gender, department, yearsOnJob
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