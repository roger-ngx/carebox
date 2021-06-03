import React from 'react';
import { View, Text } from 'react-native';

const ContainedTag = ({text}) => {

    return (
        <View
            style={{
                backgroundColor: '#1379FF',
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignSelf: 'flex-start'
            }}
        >
            <Text style={{fontWeight: '500', fontSize: 16, color: 'white'}}>{text}</Text>
        </View>
    )
}

export default ContainedTag;