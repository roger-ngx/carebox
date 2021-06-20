import React from 'react';
import { View, ScrollView } from 'react-native';
import TitleNavigationBar from 'components/TitleNavigationBar';
import ProfileImageUpload from 'components/ProfileImageUpload';
import UserInfoInputForm from './Login/UserInfoInputForm';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfileEdit = () => {

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
            <TitleNavigationBar title='프로필 수정' />
            <ScrollView>
                <ProfileImageUpload containerStyle={{marginBottom: 36}}/>
                <UserInfoInputForm />
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserProfileEdit;