import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { setAuthToken, setLoadingToken } from '../stores/slices/tokenSlice';
import { setUser } from '../stores/slices/userSlice';

const SplashScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        initApp();
    }, []);

    const initApp = async() => {
        await getToken();
    }

    const getToken = async() => {
        let userToken = null;
        let currentUser = null;

        try{
            currentUser = auth().currentUser;
            userToken = await SecureStore.getItemAsync('userToken');

            console.log('currentUser', currentUser);

            if(!currentUser && !isEmpty(userToken)){
                const userCredintial =  await auth().signInWithCustomToken(userToken);
    
                currentUser = userCredintial.user;
            }

            dispatch(setUser(currentUser));
        }catch(ex){
            console.log(ex);
            userToken = null;
            await SecureStore.setItemAsync('userToken', '');
        }

        dispatch(setAuthToken(userToken));
        dispatch(setLoadingToken(false));
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#1379FF',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Image
                style={{flex: 1}}
                source={require('assets/images/splash.png')}
            />
        </View>
    )
}

export default SplashScreen;