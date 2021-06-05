import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const PhotoUploadButton = () => {

    return (
        <TouchableOpacity
            style={{
                width: 84, height: 84,
                borderWidth: 1, borderColor: '#9C9C9C',
                borderRadius: 4,
                justifyContent: 'center', alignItems: 'center'
            }}
        >
            <Icon
                name='photo-camera'
                color='#A1A1A1'
                size={28}
            />
            <Text style={{fontSize: 15, color: '#7D7D7D', marginTop: 4}}>0/3</Text>
        </TouchableOpacity>
    )
}

export default PhotoUploadButton;