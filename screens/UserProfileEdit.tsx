import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import TitleNavigationBar from 'components/TitleNavigationBar';
import ProfileImageUpload from 'components/ProfileImageUpload';
import UserInfoInputForm from './Login/UserInfoInputForm';
import RoundButton from '../components/RoundButton';
import { updateUserInfo } from '../firebase/UserRepository';

const UserProfileEdit = ({isVisible, onClose}) => {

    const user = useSelector(state => state.user.userProfileData)

    const [ profileImageUri, setProfileImageUri ] = useState();
    const [ userInfo, setUserInfo ] = useState();

    const [ processing, setProcessing ] = useState(false);

    const onUpdateProfile = async() => {
        setProcessing(true);
        console.log('uid', user.uid)
        try{
            await updateUserInfo({uid: user.uid, profileImageUri, userInfo});
        }catch(ex){
            console.log('onUpdateProfile', ex);
        }

        setProcessing(false);
    }

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
                    <ProfileImageUpload imageUrl={user.profileImageUrl} onImageChange={setProfileImageUri} containerStyle={{marginBottom: 36}}/>
                    <UserInfoInputForm onUserInfoChange={setUserInfo} user={user}/>
                </ScrollView>
                <RoundButton text='완료' onPress={onUpdateProfile} loading={processing}/>
            </SafeAreaView>
        </Modal>
    )
}

export default UserProfileEdit;