import React from 'react';
import { View, Text, Image } from 'react-native';

const Profile = () => {

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Image source={require('assets/images/profile_image.png')} />

            <View style={{marginLeft: 8, alignItems: 'flex-start'}}>
                <View style={{flexDirection: 'row', marginBottom: 2}}>
                    <Text style={{fontSize: 16, marginRight: 2}}>아이디어 뱅크</Text>
                    <Image source={require('assets/icons/crown.png')} />
                </View>
                <Text>2년차 ∙ 병동</Text>
            </View>
        </View>
    )
}

export default Profile;