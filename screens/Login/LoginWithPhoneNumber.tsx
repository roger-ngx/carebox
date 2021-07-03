import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import UserInfoInput from './UserInfoInput';
import { setUser } from '../../stores/slices/userSlice';
import PhoneNumberVerification from './PhoneNumberVerification';
import { setAuthToken } from '../../stores/slices/tokenSlice';

const LoginWithPhoneNumber = ({navigation}) => {

    const [ showUserInfoInput, setShowUserInfoInput ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ uid, setUid ] = useState();

    const dispatch = useDispatch();

    const onFinishVerification = async (uid, isNewUser) => {
        if(isNewUser){
            setUid(uid);
        } else {
            await getToken(uid);
        }
        return true;
    }

    const getToken = async(uid) => {
        try{
            const currentUser = auth().currentUser;
            console.log('currentUser', currentUser);
            currentUser && dispatch(setUser(currentUser));
            
            let authToken = await SecureStore.getItemAsync('userToken');
            if(!authToken){
                const refeshAuthToken = functions().httpsCallable('refeshAuthToken');
                const ret = await refeshAuthToken({uid});
                console.log('getToken', ret);

                authToken = ret.data.ret.authToken;

                await SecureStore.setItemAsync('userToken', authToken);
            }

            dispatch(setAuthToken(authToken));

            navigation.navigate('Home');
        }catch(ex){
            console.log(ex);
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
                    <UserInfoInput uid={uid} navigation={navigation}/>
                ) : (
                    <PhoneNumberVerification onSuccess={onFinishVerification}/>
                )
            }
        </SafeAreaView>
    )
}

export default LoginWithPhoneNumber;