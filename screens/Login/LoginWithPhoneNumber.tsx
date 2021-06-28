import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native'; 
import { Icon } from 'react-native-elements';
import UserInfoInput from './UserInfoInput';
import functions from '@react-native-firebase/functions';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setUser } from '../../stores/slices/userSlice';
import PhoneNumberVerification from './PhoneNumberVerification';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginWithPhoneNumber = ({navigation}) => {

    const [ showUserInfoInput, setShowUserInfoInput ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ uid, setUid ] = useState();

    const dispatch = useDispatch();

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
                    <UserInfoInput uid={uid}/>
                ) : (
                    <PhoneNumberVerification onSuccess={setUid}/>
                )
            }
        </SafeAreaView>
    )
}

export default LoginWithPhoneNumber;