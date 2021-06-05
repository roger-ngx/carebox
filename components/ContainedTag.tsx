import React from 'react';
import { View, Text } from 'react-native';
import { object } from 'prop-types';

const ContainedTag = ({text, style}) => {

    return (
        <View
            style={[{
                backgroundColor: '#1379FF',
                borderRadius: 6,
                paddingHorizontal: 8,
                height: 28,
                margin: 4,
                justifyContent: 'center'
            }, style]}
        >
            <Text style={{fontWeight: 'bold', color: 'white'}}>{text}</Text>
        </View>
    )
}

export default ContainedTag;