import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ProfileChange = () => {

    const [ profileImage, setProfileImage ] = useState(require('assets/images/profile_image.png'));
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
                [{ resize: {width: 800, height: 800}}]
            )
    
            uri && setProfileImage({uri})
        }catch(ex){
            console.log(ex);
        }

        setLoadingImage(false);
    }

    return <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
            style={{
                width: 80, height: 80,
                borderRadius: 40,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center'
            }} 
        >
            {
                loadingImage ?
                <ActivityIndicator size={24} color='#787878' />
                :
                <Image
                    style={{width: '100%', height: '100%'}}
                    source={profileImage}
                    resizeMode='cover'
                />
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

export default ProfileChange;