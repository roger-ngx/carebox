import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const PhotoUploadButton = ({count, max, onReturnUri}) => {

    const [ loadingImage, setLoadingImage ] = useState(false);

    const pickImage = async () => {
        setLoadingImage(true);

        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditting: true,
            })
    
            const { uri } = await ImageManipulator.manipulateAsync(
                result.uri,
                [{ resize: {width: 800, height: 800}}]
            )
    
            uri && onReturnUri(uri)
        }catch(ex){
            Sentry.captureException(`pickImage: ${ex}`);
        }

        setLoadingImage(false);
    }

    return (
        <TouchableOpacity
            style={{
                width: 84, height: 84,
                borderWidth: 1, borderColor: '#9C9C9C',
                borderRadius: 4,
                justifyContent: 'center', alignItems: 'center'
            }}
            onPress={pickImage}
        >
            {
                loadingImage ?
                <ActivityIndicator size='small' color='#A1A1A1'/>
                :
                <Icon
                    name='photo-camera'
                    color='#A1A1A1'
                    size={28}
                />
            }
            <Text style={{fontSize: 15, color: '#7D7D7D', marginTop: 4}}>{`${count}/${max}`}</Text>
        </TouchableOpacity>
    )
}

export default PhotoUploadButton;