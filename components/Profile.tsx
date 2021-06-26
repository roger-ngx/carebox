import React from 'react';
import { View, Text, Image } from 'react-native';

const Profile = ({user={}}) => {

    const { nickName, yearsOnJob, department, profileImageUrl } = user;

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Image
                style={{width: 60, height: 60, borderRadius: 10}}
                source={{uri: profileImageUrl}}
            />

            <View style={{marginLeft: 8, alignItems: 'flex-start'}}>
                <View style={{flexDirection: 'row', marginBottom: 2}}>
                    <Text style={{fontSize: 18, marginRight: 2, color: '#334F74'}}>{nickName}</Text>
                    <Image source={require('assets/icons/crown.png')} />
                </View>
                <Text style={{color: '#334F74'}}>{yearsOnJob}년차 ∙ {department}</Text>
            </View>
        </View>
    )
}

export default Profile;