import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image'
import { ActivityIndicator } from 'react-native-paper';

const CommentInputModal = ({profileImageUrl, onSubmitCommentReply, onClose, loading}) => {

    const [ comment, setComment ] = useState('');

    const onSubmit = () => onSubmitCommentReply(comment);

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
                    <FastImage
                        style={{width: 32, height: 32, borderRadius: 32}}
                        source={
                            profileImageUrl ?
                            {uri: profileImageUrl} :
                            require('assets/icons/person.png')
                        }
                    />
                    <TextInput 
                        style={{flex: 1, color: '#898989', marginLeft: 8}}
                        placeholder='댓글 달기...'
                        value={comment}
                        onChangeText={setComment}
                        autoFocus={true}
                        multiline
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#1379FF',
                            borderRadius: 24,
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            width: 60
                        }}
                        onPress={onSubmit}
                        disabled={loading}
                    >
                        {
                            loading ?
                            <ActivityIndicator size='small' color='white' /> :
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>등록</Text>
                        }
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default CommentInputModal;