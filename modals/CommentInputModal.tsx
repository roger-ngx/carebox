import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommentInputModal = ({onSubmitComment, onClose}) => {

    const [ comment, setComment ] = useState('');

    const onSubmit = () => {
        onSubmitComment(comment);
    };

    return (
        <Modal
            isVisible={true}
            style={{margin: 0, height: '100%', justifyContent: 'flex-end'}}
            hasBackdrop={true}
            avoidKeyboard={true}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
        >
            <SafeAreaView>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        backgroundColor: 'white',
                        padding: 16,
                        alignItems: 'center'
                    }}
                >
                    <Image source={require('assets/icons/person.png')} />
                    <TextInput 
                        style={{flex: 1, color: '#898989', marginLeft: 8}}
                        placeholder='댓글 달기...'
                        value={comment}
                        onChangeText={setComment}
                        autoFocus={true}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#1379FF',
                            borderRadius: 24,
                            paddingVertical: 8,
                            paddingHorizontal: 16
                        }}
                        onPress={onSubmit}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>등록</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default CommentInputModal;