import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ProfileSettingItem = ({text, onPress}) => (
    <TouchableOpacity
        onPress={onPress}
        style={{paddingVertical: 20}}
    >
        <Text style={{color: '#334F74', fontSize: 18}}>{text}</Text>
    </TouchableOpacity>
)

export default ProfileSettingItem;