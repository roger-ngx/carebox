import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

const UploadedPhoto = ({uri, onDelete}) => (
    <ImageBackground
        source={{uri}}
        style={{
            width: 84, height: 84,
            borderRadius: 4,
            overflow: 'hidden'
        }}
    >
        <View style={{position: 'absolute', bottom: 0, right: 0}}>
            <TouchableOpacity style={{backgroundColor: '#00000044'}} onPress={onDelete}>
                <Icon name='close' color='white'/>
            </TouchableOpacity>
        </View>
    </ImageBackground>
)

export default UploadedPhoto;