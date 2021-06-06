import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import Rating from 'components/Rating';
import CBDropDownPicker from 'components/CBDropDownPicker';
import CBTextInput from 'components/CBTextInput';
import PhotoUploadButton from 'components/PhotoUploadButton';
import RoundButton from 'components/RoundButton';

const CommentRegistrationModal = () => {

    return (
        <Modal
            isVisible={true}
            style={{margin: 0}}
            avoidKeyboard={true}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
                <TouchableOpacity
                    style={{padding: 0, alignSelf: 'flex-end', padding: 8}}
                >
                    <Icon
                        name='close'
                        color='#AEAEAE'
                    />
                </TouchableOpacity>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 32}}>
                        <Text style={{fontSize: 16, color: '#334F74', fontWeight: 'bold', marginBottom: 8}}>*아이디어를 평가해 주세요.</Text>
                        <Rating
                            title='실용성'
                        />
                        <Rating
                            title='창의성'
                        />
                        <Rating
                            title='가치성'
                        />
                    </View>
                    <View style={{marginBottom: 32}}>
                        <CBDropDownPicker
                            placeholder='선택해 주세요.'
                            title='*Scamper 기법을 선택해 주세요.'
                            items={[
                                'S : 대체하기(소재, 방식, 원리)',
                                'C : 조합하기(소재, 목적, 색, 기능)',
                                'A : 응용하기',
                                'M : 수정, 확대, 축소하기',
                                'P : 용도의 전환',
                                'E : 제거하기',
                                'R : 역발상'
                            ]}
                        />
                    </View>
                    <View style={{marginBottom: 16}}>
                        <CBTextInput
                            title='*아이디어 코멘트를 남겨주세요.'
                            placeholder='입력해 주새요.'
                            multiline={true}
                            height={100}
                            maxLength={50}
                        />
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 28}}>
                        <PhotoUploadButton />
                    </View>
                    <View style={{marginBottom: 50}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, color: '#334F74'}}>링크</Text>
                            <TouchableOpacity
                                style={{padding: 4}}
                            >
                                <Icon
                                    name='add'
                                    color='#A1A1A1'
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder='입력해 주세요.'
                            style={{
                                borderRadius: 4, 
                                borderColor: '#9C9C9C',
                                borderWidth: 1,
                                padding: 12,
                                height: 50
                            }}
                        />
                    </View>
                </ScrollView>
                <RoundButton
                    text='확인'
                />
            </SafeAreaView>
        </Modal>
    )
}

export default CommentRegistrationModal;