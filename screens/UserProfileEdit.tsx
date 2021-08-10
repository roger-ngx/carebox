import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Snackbar } from 'react-native-paper';

import TitleNavigationBar from 'components/TitleNavigationBar';
import ProfileImageUpload from 'components/ProfileImageUpload';
import UserInfoInputForm from './Login/UserInfoInputForm';
import RoundButton from '../components/RoundButton';
import { updateUserInfo } from '../firebase/UserRepository';

const UserProfileEdit = ({isVisible, onClose}) => {

    const user = useSelector(state => state.user.userProfileData)

    if(!user) return null;

    const [ profileImageUri, setProfileImageUri ] = useState();
    const [ userInfo, setUserInfo ] = useState();
    const [ saved, setSaved ] = useState(false);

    const [ processing, setProcessing ] = useState(false);

    const onUpdateProfile = async() => {
        setProcessing(true);
        console.log('uid', user.uid)
        try{
            await updateUserInfo({uid: user.uid, profileImageUri, userInfo});
            setSaved(true);
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
            useNativeDriver={true}
        >
            <SafeAreaView style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
                <TitleNavigationBar title='프로필 수정' onBackPress={onClose}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 60}}>
                        <ProfileImageUpload imageUrl={user.profileImageUrl} onImageChange={setProfileImageUri} containerStyle={{marginBottom: 36}}/>
                        <UserInfoInputForm onUserInfoChange={setUserInfo} user={user}/>
                    </View>
                </ScrollView>
                <RoundButton text='완료' onPress={onUpdateProfile} loading={processing}/>
            </SafeAreaView>
            <Snackbar
                visible={saved}
                wrapperStyle={{marginBottom: 100}}
                duration={2000}
                onDismiss={() => setSaved(false)}
            >
                <Text style={{textAlign: 'center', color: 'white'}}>
                    정보를 저장했습니다
                </Text>
            </Snackbar>
        </Modal>
    )
}

export default UserProfileEdit;