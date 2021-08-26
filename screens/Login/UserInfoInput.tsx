import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { ActivityIndicator } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

import InfoModal from 'modals/InfoModal';
import CBDropDownPicker from 'components/CBDropDownPicker';
import { checkNicknameExists, signUp } from '../../firebase/UserRepository';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../stores/slices/tokenSlice';
import { setUser } from '../../stores/slices/userSlice';

const JOBS = [
    { label:'병동', value:'병동' },
    { label:'중환자실', value:'중환자실' },
    { label:'수술실', value:'수술실' },
    { label:'검사실', value:'검사실' },
    { label:'외래', value:'외래' }
]

const UserInfoInput = ({phoneNumber}) => {
    // const [ openJobSelection, setOpenJobSelection ] = useState(false);

    const [ nickName, setNickName ] = useState();
    const [ gender, setGender ] = useState();
    const [ department, setDepartment ] = useState();
    const [ yearsOnJob, setYearsOnJob ] = useState(1);

    const [ loading, setLoading ] = useState(false);

    const [ isNicknameExists, setNicknameExists ] = useState();
    const [ nickNameVerifiedIcon, setNickNameVerifiedIcon ] = useState();

    const [ isOpenConfirmModal, setOpenConfirmModal ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isNicknameExists === false){
            setNickNameVerifiedIcon(<Icon name='check' color='green' />)
        }
        if(isNicknameExists === true){
            setNickNameVerifiedIcon(<Icon name='close' color='red' />)
        }
    }, [isNicknameExists])

    const userSignUp = async() => {
        setLoading(true);

        try{

            const user = await signUp({
                nickName, gender, department, yearsOnJob, phoneNumber
            });
            if(!isEmpty(user)){
                dispatch(setUser(user));
                setOpenConfirmModal(true);
            } else {
                Alert.alert('로그인 문제가 발생했어요', '잠시후 해보세요');
            }

        }catch(ex){
            Alert.alert('로그인 문제가 발생했어요', '잠시후 해보세요');
            Sentry.captureException(`userSignUp: ${ex}`);
        }
        setLoading(false);
    }

    const checkNickname = async() => {
        const ret = await checkNicknameExists(nickName);
        
        console.log(ret);

        setNicknameExists(ret.data.isExists);
    }

    const signUpDisabled = loading || !gender || !nickName || !department;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1, padding: 24, marginTop: 30}}>

                    <ScrollView
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={{fontSize: 28, fontWeight: 'bold', color: '#001240', marginBottom: 40}}>
                            프로필을 등록해 주세요!
                        </Text>

                        <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8}}>닉네임</Text>

                        <Input
                            inputStyle={{
                                fontSize: 18,
                                padding: 16,
                                alignSelf: 'flex-start',
                                alignItems: 'center',
                                width: '100%',
                                borderWidth: 0
                            }}
                            inputContainerStyle={{borderBottomWidth: 0, backgroundColor: '#F1F1F1',}}
                            containerStyle={{paddingHorizontal: 0, borderBottomWidth: 0}}
                            placeholder='-를 제외하고 입력해 주세요'
                            value={nickName}
                            onChangeText={setNickName}
                            onBlur={() => {
                                if(!isEmpty(nickName)){
                                    checkNickname();
                                }
                            }}
                            rightIcon={nickNameVerifiedIcon}
                            errorStyle={{display: 'none'}}
                        />

                        <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8, marginTop: 32}}>성별</Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: 32
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.genderBtn, styles.genderBtnLeft, gender==='M'?styles.genderActiveBtn:styles.genderDeactiveBtn]}
                                onPress={() => setGender('M')}
                            >
                                <Text style={[styles.genderText, {color: gender==='M'?'white':'#7e7e7e'}]}>남자</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.genderBtn, gender==='F'?styles.genderActiveBtn:styles.genderDeactiveBtn]}                                
                                onPress={() => setGender('F')}
                            >
                                <Text style={[styles.genderText, {color: gender==='F'?'white':'#7e7e7e'}]}>여자</Text>
                            </TouchableOpacity>
                        </View>

                        <CBDropDownPicker
                            title='직군'
                            placeholder='선택해 주세요.'
                            items={JOBS}
                            value={department}
                            setValue={setDepartment}
                            // open={openJobSelection}
                            // setOpen={() => setOpenJobSelection(!openJobSelection)}
                        />

                        <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8, marginTop: 32}}>연차</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: '#F1F1F1',
                                alignItems: 'center',
                                marginBottom: 60
                            }}
                        >
                            <TouchableOpacity
                                style={{padding: 16}}   
                                onPress={() => yearsOnJob>1&&setYearsOnJob(yearsOnJob-1)}                       
                            >
                                <Icon
                                    name='remove-circle-outline'
                                    size={32}
                                />
                            </TouchableOpacity>
                            <Text style={{flex: 1, textAlign: 'center', fontSize: 18}}>{yearsOnJob} 년</Text>
                            <TouchableOpacity
                                style={{padding: 16}} 
                                onPress={() => setYearsOnJob(yearsOnJob+1)}                               
                            >
                                <Icon
                                    name='add-circle-outline'
                                    size={32}
                                />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#4A7CFF',
                            paddingVertical: 16,
                            borderRadius: 50,
                            width: '100%',
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            opacity: signUpDisabled ? 0.5 : 1
                        }}
                        disabled={signUpDisabled}
                        onPress={userSignUp}
                    >
                        {
                            loading ?
                            <ActivityIndicator size='small' color='white' />
                            :
                            <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white', textAlign: 'center'}}>
                                다음
                            </Text>
                        }
                    </TouchableOpacity>
            </View>
            {
                isOpenConfirmModal &&
                <InfoModal
                    isVisible={isOpenConfirmModal}
                    onClose={() => setOpenConfirmModal(false)}
                >
                    <View
                        style={{
                            width: '100%',
                            padding: 24,
                            borderRadius: 36,
                            backgroundColor: 'white',
                            alignItems: 'center'
                        }}
                    >
                        <Icon name='mood' size={48} color='orange'/>
                        <Text style={{fontSize: 15, marginTop: 24}}><Text style={{fontWeight: 'bold', fontSize: 15}}>{nickName}</Text> 간호사님, 축하합니다!</Text>
                        <Text style={{fontSize: 15, marginTop: 16}}><Text style={{fontWeight: 'bold', fontSize: 15}}>carebox</Text>에 가입되셨습니다.</Text>

                        <TouchableOpacity
                            style={{
                                width: '100%',
                                borderRadius: 50,
                                paddingVertical: 16,
                                backgroundColor: '#1379FF',
                                alignItems: 'center',
                                marginTop: 48
                            }}
                            onPress={async () => {
                                setOpenConfirmModal(false);
                                const token = await SecureStore.getItemAsync('userToken');
                                dispatch(setAuthToken(token));
                            }}
                        >
                            <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </InfoModal>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    genderBtn: {
        flex: 1, paddingVertical: 16, borderRadius: 6
    },
    genderBtnLeft: {
        marginRight: 4
    },
    genderActiveBtn: {
        backgroundColor: '#1379FF',
        color: 'white'
    },
    genderDeactiveBtn: {
        backgroundColor: '#F1F1F1',
        color: '#7e7e7e'
    },
    genderText: {
        fontSize: 18, textAlign: 'center'
    }
})

export default UserInfoInput;