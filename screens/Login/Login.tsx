import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native'; 
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
} from '@react-native-seoul/kakao-login';
import { Icon } from 'react-native-elements';
import UserInfoInput from './UserInfoInput';
import functions from '@react-native-firebase/functions';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setUser } from '../../stores/slices/userSlice';

const Login = ({navigation}) => {

    const [ showUserInfoInput, setShowUserInfoInput ] = useState(false);
    const [ kakaoId, setKakaoId ] = useState();
    const [ loading, setLoading ] = useState(false);

    const dispatch = useDispatch();

    const signInWithKakao = async (): Promise<void> => {
        setLoading(true);
        try{
            const token: KakaoOAuthToken = await login();
        
            console.log(token);
    
            const profile:KakaoProfile = await getKakaoProfile();
            console.log(profile);
            setKakaoId(profile.id+'');

            dispatch(setUser(profile));
    
            const checkUserExists = functions().httpsCallable('checkUserExists');
            const ret = await checkUserExists({uid: profile.id+''});
            console.log(ret);

            setLoading(false);

            if(ret.isExists){
                navigation.navigate('Home');
            }else{
                setShowUserInfoInput(true);
            }
        }catch(ex){
            console.log('signInWithKakao', ex)
            setLoading(false);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {
                showUserInfoInput ? (
                    <UserInfoInput uid={kakaoId}/>
                ) : (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#334F74',
                            borderRadius: 4,
                            padding: 16,
                            width: '80%',
                            justifyContent: 'center'
                        }}
                        onPress={signInWithKakao}
                    >
                        {
                            loading ?
                            <ActivityIndicator size='small' color='#334F74' />
                            :
                            <>
                                <Icon
                                    name='chat'
                                    type='material-community'
                                    color='#334F74'
                                />
                                <Text style={{flex: 1, fontSize: 18, textAlign: 'center', color: '#334F74'}}>카카오 로그인</Text>
                            </>
                        }
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default Login;