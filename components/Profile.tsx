import React from 'react';
import { View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image'

const getGradeIcon = grade => {
    switch(grade){
        case 1:
            return require(`assets/icons/grade1.png`);

        case 2:
            return require(`assets/icons/grade2.png`);

        case 3:
            return require(`assets/icons/grade3.png`);

        case 4:
            return require(`assets/icons/grade4.png`);
    }
}

const Profile = ({user={}, avatarType='square'}) => {

    if(!user) return null;

    const { nickName, yearsOnJob, department, profileImageUrl, grade } = user;

    const gradeIcon = getGradeIcon(grade);

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
                    <Image style={{height: 16, width: 16}} source={gradeIcon} resizeMode='contain'/>
                </View>
                <Text style={{color: '#334F74'}}>{yearsOnJob}년차 ∙ {department}</Text>
            </View>
        </View>
    )
}

export default Profile;