import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements'

import IdeaPhotoUpload from 'components/IdeaPhotoUpload';
import ExternalLinkUpload from '../../components/ExternalLinkUpload';

const ForthStep = ({idea}) => {

    const [ isNotUploadPhotoAndLink, setNotUploadPhotoAndLink ] = useState();
    
    useEffect(() => {
        idea.setImageAndLinkRequired(!isNotUploadPhotoAndLink);
    }, [isNotUploadPhotoAndLink])

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
                    <TouchableOpacity>
                        <Text style={styles.headerTxt}>+ 추가</Text>
                    </TouchableOpacity>
                </View>
                <IdeaPhotoUpload onImageChanged={image => idea.setImages([image])}/>
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
                    <TouchableOpacity>
                        <Text style={styles.headerTxt}>+ 추가</Text>
                    </TouchableOpacity>
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