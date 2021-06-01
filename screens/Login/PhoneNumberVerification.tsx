import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

const PhoneNumberVerification = () => {
    const [ step, setStep ] = useState(1);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1, padding: 24, marginTop: 60}}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: '#001240'}}>
                    {`간호사님,\n케어박스가 처음이시군요!`}
                </Text>

                <View
                    style={{
                        marginTop: 48,
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >
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
                                    placeholder='-를 제외하고 입력해 주세요'
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
                                            alignItem: 'center'
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

                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#4A7CFF',
                            paddingVertical: 16,
                            borderRadius: 50,
                            width: '100%',
                            alignSelf: 'flex-end'
                        }}
                        onPress={() => setStep(2)}
                    >
                        <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white', textAlign: 'center'}}>
                            다음
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PhoneNumberVerification;