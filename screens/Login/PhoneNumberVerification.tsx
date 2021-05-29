import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';

const PhoneNumberVerification = () => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Text style={{fontSize: 40, fontWeight: 'bold', color: '#001240'}}>
                    {`간호사님,\n케어박스가 처음이시군요!`}
                </Text>
                <Text style={{fontSize: 30, color: '#434A3F'}}>휴대폰 번호로 가입해주세요</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#4A7CFF',
                            paddingHorizantal: 16,
                            paddingVertical: 8
                        }}
                    >
                        <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>인증문자 받기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PhoneNumberVerification;