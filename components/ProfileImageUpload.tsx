import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image'

const ProfileImageUpload = ({imageUrl, containerStyle, onImageChange}) => {

    const [ profileImage, setProfileImage ] = useState(imageUrl ? {uri: imageUrl} : null);
    const [ loadingImage, setLoadingImage ] = useState(false);

    const pickImage = async () => {
        setLoadingImage(true);

        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditting: true,
                aspect: [ 1, 1 ]
            })
    
            const { uri } = await ImageManipulator.manipulateAsync(
                result.uri,
                [{ resize: {width: 400, height: 400}}]
            )
    
            if(uri){
                setProfileImage({uri});
                onImageChange(uri);
            }
        }catch(ex){
            console.log(ex);
        }

        setLoadingImage(false);
    }

    return <View style={[{justifyContent: 'center', alignItems: 'center'}, containerStyle]}>
        <View
            style={{
                width: 80, height: 80,
                borderRadius: 40,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: profileImage ? 0 : 1,
                borderColor: '#787878'
            }} 
        >
            {
                loadingImage ?
                <ActivityIndicator size={24} color='#787878' />
                :
                (
                    profileImage ?
                    <FastImage
                        style={{width: '100%', height: '100%'}}
                        source={profileImage}
                        resizeMode='cover'
                    />
                    :
                    <Icon
                        name='person-outline'
                        color='#787878'
                        size={48}
                    />
                )
            }
        </View>
        <TouchableOpacity
            style={{
                borderWidth: 1,
                borderColor: '#919191',
                height: 32,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                width: 95,
                marginTop: 8 
            }}
            onPress={pickImage}
        >
            <Text style={{fontWeight: 'bold', color: '#787878'}}>사진등록</Text>
        </TouchableOpacity>
    </View>
}

export default ProfileImageUpload;