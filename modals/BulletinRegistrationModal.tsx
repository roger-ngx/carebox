import React, { useState, useEffect }  from 'react';
import Modal from 'react-native-modal';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { size } from 'lodash';
import { Snackbar } from 'react-native-paper';

import CBTextInput from 'components/CBTextInput';
import RoundButton from 'components/RoundButton';
import CommentImagesUploader from '../components/CommentImagesUploader';
import { useSelector } from 'react-redux';
import CBButton from '../components/CBButton';
import { addBulletinItem } from '../firebase/BulletinRepository';

const BulletinRegistrationModal = ({onClose}) => {
    
    const [ bulletinType, setBulletinType ] = useState();
    const [ content, setContent ] = useState();
    const [ imageUris, setImageUris ] = useState();
    const [ showingFinishButton, setShowingFinishButton ] = useState(false);
    const [ processing, setProcessing ] = useState(false);

    const owner = useSelector(state => state.user.userProfileData);

    const onAddCommentToIdea = async () => {
        setProcessing(true);

        const ret = await addBulletinItem({owner, imageUris, type: bulletinType, content});

        setProcessing(false);
        if(!ret){
            return Alert.alert('add comment failed', '');
        }

        onClose();
    }

    useEffect(() => {
        setShowingFinishButton(bulletinType && size(imageUris) > 0 && content);
    }, [bulletinType, imageUris, content]);

    return (
        <Modal
            isVisible={true}
            style={{margin: 0}}
            avoidKeyboard={true}
            onBackButtonPress={onClose}
        >
            <SafeAreaView style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', paddingVertical: 8}}>
                    <Text style={{flex: 1, marginRight: -32, fontSize: 18, color: '#334F74', fontWeight: 'bold', textAlign: 'center'}}>글쓰기</Text>

                    <TouchableOpacity
                        style={{padding: 0, alignSelf: 'flex-end', padding: 8}}
                        onPress={onClose}
                    >
                        <Icon
                            name='close'
                            color='#AEAEAE'
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1, backgroundColor: '#F1F7FF', padding: 20}} showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 32}}>
                        <Text style={{fontSize: 16, color: '#334F74', marginBottom: 8, fontWeight: 'bold'}}>카테고리 선택</Text>
                        <View style={{flexDirection: 'row'}}>
                            <CBButton
                                text='일상'
                                variant={bulletinType==='일상' ? 'contained' : 'outlined'}
                                containerStyle={{width: 100, marginRight: 8}}
                                onPress={() => setBulletinType('일상')}
                            />
                            <CBButton
                                text='업무'
                                variant={bulletinType==='업무' ? 'contained' : 'outlined'}
                                containerStyle={{width: 100}}
                                onPress={() => setBulletinType('업무')}
                            />
                        </View>
                    </View>
                    <View style={{marginBottom: 16}}>
                        <CBTextInput
                            title='구체적 상황'
                            placeholder='내용을 입력해주세요 (최소 20자)'
                            multiline={true}
                            height={150}
                            maxLength={2000}
                            minLength={20}
                            textAlignVertical={'top'}
                            value={content}
                            onChangeText={setContent}
                            textInputStyle={{backgroundColor: 'white'}}
                            placeholderTextColor='#7D7D7D'
                        />
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 28}}>
                        <CommentImagesUploader
                            onImagesChange={setImageUris}
                        />
                    </View>
                </ScrollView>
                {
                    !!showingFinishButton &&
                    <View style={{backgroundColor: '#F1F7FF', padding: 20}}>
                        <RoundButton
                            text='등록'
                            onPress={onAddCommentToIdea}
                            loading={processing}
                        />
                    </View>
                }
            </SafeAreaView>
            {/* <Snackbar
                visible={true}
                wrapperStyle={{marginBottom: 100}}
            >
                <Text style={{textAlign: 'center', color: 'white'}}>
                    미입력 항목이 있습니다.
                </Text>
            </Snackbar> */}
        </Modal>
    )
}

export default BulletinRegistrationModal;