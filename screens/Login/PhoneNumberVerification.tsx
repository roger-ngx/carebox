import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { size } from 'lodash';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';

const PhoneNumberVerification = ({onSuccess}) => {
    const [ step, setStep ] = useState(1);
    const [ phoneNumber, setPhoneNumber ] = useState();
    const [ confirmation, setConfirmation ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ verificationCode, setVerificationCode ] = useState();
    const [ isTextOnFocus, setTextOnFocus ] = useState(false);

    async function signInWithPhoneNumber() {
        setLoading(true);

        try{
            const number = phoneNumber.replace('0', '+82');
            console.log(number);
            const confirmation = await auth().signInWithPhoneNumber(number);
            setConfirmation(confirmation);
        }catch(e){
            console.log('signInWithPhoneNumber', e);
        }

        setLoading(false);
        setStep(2);
    }

    const confirmCode = async () => {
        setLoading(true);

        try{
            const {additionalUserInfo, user} = await confirmation.confirm(verificationCode);
            console.log('user', user);

            await onSuccess(user.uid, additionalUserInfo.isNewUser, user.phoneNumber);
        }catch(ex){
            console.log('confirmCode', ex);
        }

        setLoading(false);
    }

    return (
        <View style={{flex: 1, width: '100%', padding: 24, marginTop: 60}}>

            <ScrollView
                style={{
                    flexDirection: 'column',
                    flex: 1,
                }}
            >
                <Text style={{fontSize: 28, fontWeight: 'bold', color: '#001240', marginBottom: 48,}}>
                    {`간호사님,\n케어박스가 처음이시군요!`}
                </Text>
                {
                    step === 1 &&
                    <>
                        <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 12}}>휴대폰 번호로 가입해주세요</Text>

                        <TextInput
                            style={{
                                fontSize: 18,
                                backgroundColor: '#F1F1F1',
                                paddingVertical: 16,
                                alignSelf: 'flex-start',
                                alignItems: 'center',
                                width: '100%'
                            }}
                            keyboardType='numeric'
                            textAlign='center'
                            placeholder='-를 제외하고 입력해 주세요'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            maxLength={11}
                            onFocus={() => setTextOnFocus(true)}
                            onBlur={() => setTextOnFocus(false)}
                        />

                        <CheckBox
                            center
                            iconRight
                            title='사이트 이용약관 및 개인정보 수집 동의'
                            textStyle={{
                                textDecorationLine: 'underline',
                                fontSize: 12,
                                color: '#979797',
                                fontWeight: 'normal'
                            }}
                            containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 0
                            }}
                        />
                    </>
                }

                {
                    step === 2 &&
                    <>
                        <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 12}}>
                            인증번호를 입력해 주세요
                        </Text>

                        <TextInput
                            style={{
                                fontSize: 18,
                                backgroundColor: '#F1F1F1',
                                paddingVertical: 16,
                                alignSelf: 'flex-start',
                                alignItems: 'center',
                                width: '100%'
                            }}
                            keyboardType='numeric'
                            textAlign='center'
                            placeholder='• • • • • •'
                            value={verificationCode}
                            onChangeText={setVerificationCode}
                            onFocus={() => setTextOnFocus(true)}
                            onBlur={() => setTextOnFocus(false)}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 24
                            }}
                        >
                            <Text style={{marginRight: 16}}>
                                인증번호가 오지 않았나요?
                            </Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    signInWithPhoneNumber();
                                    setVerificationCode();
                                }}
                            >
                                <Icon
                                    type='material'
                                    name='refresh'
                                    size={14}
                                />
                                <Text>재발송하기</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }

            </ScrollView>

            {
                !isTextOnFocus &&
                <TouchableOpacity
                    style={{
                        backgroundColor: '#4A7CFF',
                        paddingVertical: 16,
                        borderRadius: 50,
                        width: '100%',
                        // alignSelf: 'flex-end'
                    }}
                    disabled={(step===1&&size(phoneNumber)!==11) || loading}
                    onPress={step===1?signInWithPhoneNumber:confirmCode}
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
            }
        </View>
    )
}

export default PhoneNumberVerification;