import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements'

import ExternalLinkUpload from '../../components/ExternalLinkUpload';
import CommentImagesUploader from '../../components/CommentImagesUploader';

const ForthStep = ({idea}) => {

    const [ isNotUploadPhotoAndLink, setNotUploadPhotoAndLink ] = useState();
    const [ imageUris, setImageUris ] = useState(idea.idea.image.urls);
    const [ imageTitle, setImageTitle ] = useState(idea.idea.image.title)
    
    useEffect(() => {
        idea.setImageAndLinkRequired(!isNotUploadPhotoAndLink);
    }, [isNotUploadPhotoAndLink])

    useEffect(() => {
        idea.setImages({title: imageTitle, urls: imageUris})
    }, [imageTitle, imageUris]);

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    marginTop: 8
                }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.headerTxt}>
                        * 이미지
                    </Text>
                </View>
                <View style={{flexDirection: 'column', marginBottom: 28}}>
                    <CommentImagesUploader
                        imageUris={imageUris}
                        onImagesChange={setImageUris}
                    />
                    <TextInput
                        placeholder='설명 추가'
                        style={[styles.textInput, {marginTop: 8}]}
                        maxLength={50}
                        value={imageTitle}
                        onChangeText={setImageTitle}
                    />
                </View>
            </View>
            <View
                style={{
                    marginTop: 32
                }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.headerTxt}>
                        * 링크
                    </Text>
                    {/* <TouchableOpacity>
                        <Text style={styles.headerTxt}>+ 추가</Text>
                    </TouchableOpacity> */}
                </View>
                <ExternalLinkUpload onLinkChanged={link => idea.setLinks([link])} />
            </View>
            <CheckBox
                title='이미지, 링크 등록없이 업로드 할래요.'
                containerStyle={{
                    backgroundColor: 'transparent',
                    paddingLeft: 0,
                    marginLeft: 0,
                    borderWidth: 0
                }}
                checked={isNotUploadPhotoAndLink}
                textStyle={{
                    color: '#334F74',
                    fontSize: 16,
                    fontWeight: 'normal'
                }}
                onPress={() => setNotUploadPhotoAndLink(!isNotUploadPhotoAndLink)}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#334F74'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#9C9C9C',
        borderRadius: 4,
        padding: 16,
        fontSize: 16,
        backgroundColor: 'white'
    }
});

export default ForthStep;