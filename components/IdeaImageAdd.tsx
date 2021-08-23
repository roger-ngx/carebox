import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { View, TouchableOpacity, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import { throttle } from 'lodash';

const IdeaImageAdd = () => {

    const [ profileImage, setProfileImage ] = useState();
    const [ loadingImage, setLoadingImage ] = useState(false);

    const pickImage = async () => {
        setLoadingImage(true);

        try{
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status == 'granted') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1]
                })
        
                const { uri } = await ImageManipulator.manipulateAsync(
                    result.uri,
                    [{ resize: {width: 800, height: 800}}]
                )
        
                uri && setProfileImage({uri})
            } else {
                Sentry.captureMessage('no photo permission')
            }
        }catch(ex){
            Sentry.captureException(`pickImage: ${ex}`);
        }

        setLoadingImage(false);
    }

    return  (
        <View style={{width: '100%'}}>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: '#9C9C9C',
                    borderRadius: 4,
                    height: 130,
                    marginBottom: 8,
                    backgroundColor: 'white',
                    justifyContent: 'center'
                }}
                onPress={throttle(pickImage, 2000, { trailing: false})}
                disabled={loadingImage}
            >
                {
                    loadingImage ? 
                    <ActivityIndicator color='#A1A1A1' size={44}/>
                    :
                    (
                        !!profileImage ?
                        <Image source={profileImage} style={{flex: 1}}/>
                        :
                        <Icon
                            color='#A1A1A1'
                            name='photo-camera'
                            size={44}
                        />
                    )
                }
            </TouchableOpacity>
            <TextInput
                placeholder='설명 추가'
                style={{
                    borderWidth: 1,
                    borderColor: '#9C9C9C',
                    borderRadius: 4,
                    padding: 16,
                    fontSize: 16,
                    backgroundColor: 'white'
                }}
                maxLength={50}
            />
        </View>
    )
}

export default IdeaImageAdd;