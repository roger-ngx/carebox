
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';

export async function checkNicknameExists(nickName){
    const checkNicknameExists = functions().httpsCallable('checkNicknameExists');
    return await checkNicknameExists({nickName});
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