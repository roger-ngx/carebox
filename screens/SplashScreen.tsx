import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async() => {
        try{
            console.log(auth().currentUser);
            const userToken = await SecureStore.getItemAsync('userToken');
            if(userToken == null){
                navigation.navigate('Login');
            } else {
                navigation.navigate('Home');
            }
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