import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setAuthToken, setLoadingToken } from '../stores/slices/tokenSlice';
import { setUser, setUserUid } from '../stores/slices/userSlice';

const SplashScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async() => {
        try{
            console.log(auth().currentUser);
            const userToken = await SecureStore.getItemAsync('userToken');
            
            const currentUser = auth().currentUser;
            currentUser && dispatch(setUser(currentUser));

            dispatch(setAuthToken(userToken));
            dispatch(setLoadingToken(false));
        }catch(ex){
            console.log(ex);
        }
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