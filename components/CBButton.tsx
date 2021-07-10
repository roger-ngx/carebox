import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CBButton = ({text, variant, onPress, containerStyle}) => (
    <TouchableOpacity
        style={[{
            backgroundColor: variant==='contained' ? '#1379FF' : 'white',
            borderWidth: 1,
            borderColor: '#1379FF',
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 16
        }, containerStyle]}
        onPress={onPress}
    >
        <Text
            style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: variant==='contained' ? 'white' : '#1379FF'
            }}
        >
            {text}
        </Text>
    </TouchableOpacity>
)

export default CBButton;