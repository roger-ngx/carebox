import React from 'react';
import { View, Text } from 'react-native';

const OutlinedTag = ({sign, text}) => {

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#1379FF',
                backgroundColor: 'white',
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignSelf: 'flex-start',
                flexDirection: 'row'
            }}
        >
            <Text style={{fontWeight: 'bold', color: '#1379FF', marginRight: 4}}>{sign}</Text>
            <Text style={{fontWeight: '500', color: '#1379FF'}}>{text}</Text>
        </View>
    )
}

export default OutlinedTag;