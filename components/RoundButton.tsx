import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const RoundButton = ({text, onPress}) => {

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#4A7CFF',
                paddingVertical: 16,
                borderRadius: 50,
                width: '100%',
                alignSelf: 'flex-end'
            }}
            onPress={onPress}
        >
            <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white', textAlign: 'center'}}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default RoundButton;