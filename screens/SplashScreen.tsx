import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { setAuthToken, setLoadingToken } from '../stores/slices/tokenSlice';
import { setUser } from '../stores/slices/userSlice';
import { getUserAuthToken } from '../firebase/UserRepository';

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

            
            if(!currentUser && !isEmpty(userToken)){
                const userCredintial =  await auth().signInWithCustomToken(userToken);
                
                currentUser = userCredintial.user;
            }
            
            console.log('currentUser', currentUser);
        }catch(ex){
            Sentry.captureException(`getToken: ${ex}`);
        }
        
        if(currentUser){
            const authToken = await getUserAuthToken(currentUser.uid);
            if(authToken === userToken){
                dispatch(setUser(currentUser));
            }else{
                userToken = null;
                await SecureStore.setItemAsync('userToken', '');
            }
        }else{
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
                resizeMode='contain'
            />
        </View>
    )
}

export default SplashScreen;