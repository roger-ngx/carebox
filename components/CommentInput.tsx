import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { throttle } from 'lodash';

const CommentInput = ({profileImageUrl, loading, onSubmit, containerStyle}) => {

    const [ comment, setComment ] = useState();

    return (
        <View
            style={[{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: 'white',
                padding: 16,
                alignItems: 'center'
            }, containerStyle]}
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
                    paddingHorizontal: 16
                }}
                onPress={throttle(() => onSubmit(comment), 2000, {trailing: false})}
                disabled={loading}
            >
                {
                    loading ?
                    <ActivityIndicator size='small' color='white' /> :
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>등록</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default CommentInput;