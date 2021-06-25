import React from 'react';
import Modal from 'react-native-modal';
import { View, ScrollView } from 'react-native';
import TitleNavigationBar from 'components/TitleNavigationBar';
import ProfileImageUpload from 'components/ProfileImageUpload';
import UserInfoInputForm from './Login/UserInfoInputForm';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfileEdit = ({isVisible, onClose}) => {

    return (
        <Modal
            isVisible={isVisible}
            style={{margin: 0}}
            hasBackdrop={false}
            onBackButtonPress={onClose}
            animationIn='slideInRight'
            animationOut='slideOutLeft'
            useNativeDriver={true}
        >
            <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
                <TitleNavigationBar title='프로필 수정' onBackPress={onClose}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ProfileImageUpload containerStyle={{marginBottom: 36}}/>
                    <UserInfoInputForm />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default UserProfileEdit;