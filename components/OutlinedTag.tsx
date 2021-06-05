import React from 'react';
import { View, Text } from 'react-native';

const OutlinedTag = ({sign, text, style}) => {

    return (
        <View
            style={[{
                borderWidth: 1,
                borderColor: '#1379FF',
                backgroundColor: 'white',
                borderRadius: 6,
                paddingHorizontal: 8,
                height: 28,
                alignItems: 'center',
                flexDirection: 'row',
                margin: 4
            }, style]}
        >
            <Text style={{fontWeight: 'bold', color: '#1379FF', marginRight: 4}}>{sign}</Text>
            <Text style={{fontWeight: '500', color: '#1379FF'}}>{text}</Text>
        </View>
    )
}

export default OutlinedTag;