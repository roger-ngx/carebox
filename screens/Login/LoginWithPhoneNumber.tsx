import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import { View, ActivityIndicator } from 'react-native';
import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import UserInfoInput from './UserInfoInput';
import { setUser } from '../../stores/slices/userSlice';
import PhoneNumberVerification from './PhoneNumberVerification';
import { setAuthToken } from '../../stores/slices/tokenSlice';
import { updateUserPushToken } from '../../firebase/UserRepository';
import LoadingModal from '../../modals/LoadingModal';

const LoginWithPhoneNumber = ({navigation}) => {

    const [ loading, setLoading ] = useState(false);
    const [ isNewUser, setIsNewUser ] = useState();
    const [ phoneNumber, setPhoneNumber ] = useState();

    const dispatch = useDispatch();

    const onFinishVerification = async ({isNewUser, phoneNumber, uid, authToken}) => {
        if(!phoneNumber) return false;

        try{
            if(isNewUser){
                setPhoneNumber(phoneNumber);
                setIsNewUser(true);
            } else {
                if(authToken){
                    setLoading(true);

                    const userCredential = await auth().signInWithCustomToken(authToken);
                    dispatch(setUser(userCredential.user));

                    await SecureStore.setItemAsync('userToken', authToken);
                    await createPushToken(uid);
                    dispatch(setAuthToken(authToken));

                    setLoading(false);
                }
            }
        }catch(ex){
            Sentry.captureException(`onFinishVerification: ${ex}`);
        }

        return true;
    }

    const createPushToken = async (uid) => {
        if(!uid) return;
        try{
            const token = await messaging().getToken();
            return await updateUserPushToken(uid, token);
        }catch(ex){
            Sentry.captureException(`createPushToken: ${ex}`);
        }
    }

    const getAuthToken = async(uid) => {
        try{
            let authToken = await SecureStore.getItemAsync('userToken');
            if(isEmpty(authToken)){
                const refeshAuthToken = functions().httpsCallable('refeshAuthToken');
                const ret = await refeshAuthToken({uid});
                console.log('getToken', ret);

                authToken = ret.data.ret.authToken;

                if(authToken){
                    await auth().signInWithCustomToken(authToken);
                    await SecureStore.setItemAsync('userToken', authToken);
                }
            }

            dispatch(setAuthToken(authToken));
        }catch(ex){
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
                isNewUser ? (
                    <UserInfoInput phoneNumber={phoneNumber} navigation={navigation}/>
                ) : (
                    <PhoneNumberVerification onSuccess={onFinishVerification}/>
                )
            }
        </SafeAreaView>
    )
}

export default LoginWithPhoneNumber;