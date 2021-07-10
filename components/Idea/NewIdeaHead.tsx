import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

const NewIdeaHead = ({owner}) => {

    if(!owner) return null;

    const { nickName, department, yearsOnJob, profileImageUrl } = owner;

    useEffect(() => {
        
    }, [profileImageUrl])

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <FastImage
                style={{width: 32, height: 32, borderRadius: 32}}
                source={profileImageUrl ? {uri:profileImageUrl} : require('assets/icons/person.png')}
            />
            <Text style={{fontSize: 16, marginHorizontal: 8, fontWeight: '500'}}>{nickName}</Text>
            <Text>{yearsOnJob}년차 ∙ {department}</Text>
        </View>
    )
}

export default NewIdeaHead;