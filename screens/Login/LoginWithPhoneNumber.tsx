import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';

import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import UserInfoInput from './UserInfoInput';
import { setUser } from '../../stores/slices/userSlice';
import PhoneNumberVerification from './PhoneNumberVerification';
import { setAuthToken } from '../../stores/slices/tokenSlice';
import { updateUserPushToken } from '../../firebase/UserRepository';

const LoginWithPhoneNumber = ({navigation}) => {

    const [ showUserInfoInput, setShowUserInfoInput ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ uid, setUid ] = useState();
    const [ phoneNumber, setPhoneNumber ] = useState();

    const dispatch = useDispatch();

    const onFinishVerification = async (uid, isNewUser, phoneNumber) => {
        if(isNewUser){
            setUid(uid);
            setPhoneNumber(phoneNumber);
        } else {
            await getAuthToken(uid);
        }

        await createPushToken(uid);
        return true;
    }

    const createPushToken = async (uid) => {
        try{
            const token = await messaging().getToken();
            return await updateUserPushToken(uid, token);
        }catch(ex){
            Sentry.captureException(`createPushToken: ${ex}`);
        }
    }

    const getAuthToken = async(uid) => {
        try{
            const currentUser = auth().currentUser;
            console.log('currentUser', currentUser);
            currentUser && dispatch(setUser(currentUser));
            
            let authToken = await SecureStore.getItemAsync('userToken');
            if(isEmpty(authToken)){
                const refeshAuthToken = functions().httpsCallable('refeshAuthToken');
                const ret = await refeshAuthToken({uid});
                console.log('getToken', ret);

                authToken = ret.data.ret.authToken;

                await SecureStore.setItemAsync('userToken', authToken);
            }

            dispatch(setAuthToken(authToken));

            // navigation.navigate('Home');
        }catch(ex){
            console.log(ex);
            Sentry.captureException(`getAuthToken: ${ex}`);
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}
        >
            {
                uid ? (
                    <UserInfoInput uid={uid} phoneNumber={phoneNumber} navigation={navigation}/>
                ) : (
                    <PhoneNumberVerification onSuccess={onFinishVerification}/>
                )
            }
        </SafeAreaView>
    )
}

export default LoginWithPhoneNumber;