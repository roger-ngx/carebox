import React from 'react';
import { View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image'

const Profile = ({user={}, avatarType='square'}) => {

    const { nickName, yearsOnJob, department, profileImageUrl, grade } = user;
    console.log('grade', grade);
    const gradeIcon = grade === 2 ? require('assets/icons/grade2.png') : require('assets/icons/grade1.png')

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <FastImage
                style={{width: 60, height: 60, borderRadius: avatarType==='square' ? 10 : 30}}
                source={profileImageUrl ? {uri: profileImageUrl} : require('assets/icons/person.png')}
            />

            <View style={{marginLeft: 8, alignItems: 'flex-start'}}>
                <View style={{flexDirection: 'row', marginBottom: 2, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, marginRight: 2, color: '#334F74'}}>{nickName}</Text>
                    <Image style={{width: 16, height: 16}} source={gradeIcon} />
                </View>
                <Text style={{color: '#334F74'}}>{yearsOnJob}년차 ∙ {department}</Text>
            </View>
        </View>
    )
}

export default Profile;