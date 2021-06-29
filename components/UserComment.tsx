import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const UserComment = ({user, comment}) => {

    const { nickName, profileImageUrl } = user;

    return (
        <View style={{flexDirection: 'row', marginVertical: 16}}>
            <FastImage
                style={{width: 32, height: 32, borderRadius: 32}}
                source={profileImageUrl ? {uri: profileImageUrl} : require('assets/icons/person.png')}
            />
            <View style={{flex: 1, backgroundColor: '#eee', borderRadius: 10, padding: 8, marginLeft: 8}}>
                <Text style={{color: '#1D395F', fontWeight: '500'}}>{nickName}</Text>
                <Text style={{color: '#333', marginTop: 4}}>{comment}</Text>
            </View>
        </View>
    )
}

export default UserComment;