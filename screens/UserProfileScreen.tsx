import React, { useState } from 'react';

import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from '../components/Profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import UserProfileEdit from './UserProfileEdit';
import ProfileSettingItem from '../components/ProfileSettingItem';
import { useSelector } from 'react-redux';

const UserProfileScreen = ({navigation}) => {

    const user = useSelector(state => state.user.userProfileData);

    const [ showingProfileEditModal, setShowingProfileEditModal ] = useState(false);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16}}>
                    <Text style={{color: '#334F74', fontWeight: 'bold', fontSize: 18}}>마이페이지</Text>
                </View>
                <Divider style={{marginHorizontal: -20}}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, alignItems: 'center'}}>
                    <Profile user={user}/> 
                    <TouchableOpacity
                        style={{backgroundColor: '#F1F1F1', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 50}}
                        onPress={() => setShowingProfileEditModal(true)}
                    >
                        <Text style={{color: '#627DA0', fontSize: 12}}>프로필 수정</Text>
                    </TouchableOpacity>
                </View>

                <Divider style={{height: 10, backgroundColor: '#F1F1F1', borderWidth: 0, marginHorizontal: -20}} />
                
                <ProfileSettingItem
                    text='찜 목록'
                    onPress={() => navigation.navigate('LikedIdeas')}
                />
                <Divider />
                <ProfileSettingItem
                    text='내가 등록한 아이디어'
                    onPress={() => navigation.navigate('RegisteredIdeas')}
                />
                <ProfileSettingItem
                    text='내가 등록한 코멘트'
                    onPress={() => navigation.navigate('RegisteredComments')}
                />
                <Divider />
                <ProfileSettingItem
                    text='내가 쓴 게시글'
                    onPress={() => navigation.navigate('RegisteredBulletinItems')}
                />
                <ProfileSettingItem
                    text='내가 쓴 댓글'
                />
                <Divider />
                <ProfileSettingItem
                    text='설정'
                    onPress={() => navigation.navigate('UserAccountSetting')}
                />
            </ScrollView>

            <UserProfileEdit
                isVisible={showingProfileEditModal}
                onClose={() => setShowingProfileEditModal(false)}
            />
        </SafeAreaView>
    )
}

export default UserProfileScreen;