import React from 'react';
import { View, Text, Image } from 'react-native';

const NewIdeaHead = ({idea}) => {

    if(!idea || !idea.owner) return null;

    const { nickName, department, yearsOnJob, profileImageUrl } = idea.owner;

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Image
                style={{width: 32, height: 32, borderRadius: 32}}
                source={profileImageUrl ? {uri:profileImageUrl} : require('assets/icons/person.png')}
            />
            <Text style={{fontSize: 16, marginHorizontal: 8, fontWeight: '500'}}>{nickName}</Text>
            <Text>{yearsOnJob}년차 ∙ {department}</Text>
        </View>
    )
}

export default NewIdeaHead;