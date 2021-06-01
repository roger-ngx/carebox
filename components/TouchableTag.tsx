import React from 'react';

import { Text, TouchableOpacity } from 'react-native';

const TouchableTag = ({title, isSelected, onPress}) => {

    return (
        <TouchableOpacity
            style={{
                borderWidth: 1,
                borderColor: '#1379FF',
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: isSelected ? '#1379FF' : 'white'
            }}
            onPress={() => onPress(title)}
        >
            <Text style={{color: isSelected ? 'white' : '#1379FF', fontSize: 16}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TouchableTag;