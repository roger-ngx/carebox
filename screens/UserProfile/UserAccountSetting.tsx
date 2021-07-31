import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Linking, Alert } from 'react-native';
import { Divider } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';
import { useSelector } from 'react-redux';

import PickedIdea from '../../components/Idea/PickedIdea';
import ProfileSettingItem from '../../components/ProfileSettingItem';
import TitleNavigationBar from '../../components/TitleNavigationBar';
import { getLikedIdeas, signOut } from '../../firebase/UserRepository';

const RoundButton =({text, onPress, containerStyle}) => (
    <TouchableOpacity
        style={[{
            borderRadius: 32,
            borderWidth: 1,
            borderColor: '#898989',
            paddingVertical: 16,
            paddingHorizontal: 32
        }, containerStyle]}
        onPress={onPress}
    >
        <Text style={{fontSize: 16, color: '#6B7A8E'}}>{text}</Text>
    </TouchableOpacity>
)

const UserAccountSetting = ({navigation}) => {
    const goOut = async () => {
        const ret = await signOut();
        if(ret){
            Updates.reloadAsync();
        }else{
            Alert.alert('Error. Plz try again');
        }
    }

    const membershipWidthraw = () => {

    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
                <TitleNavigationBar
                    title='설정'
                    containerStyle={{paddingVertical: 8}}
                    onBackPress={() => navigation.pop()}
                />
            </View>
            <View style={{flex: 1, paddingHorizontal: 20}}>
                <View style={{flex: 1}}>
                    {/* <Divider />
                    <ProfileSettingItem
                        text='FAQ'
                    /> */}
                    <Divider />
                    <ProfileSettingItem
                        text='이용약관'
                        onPress={() => Linking.openURL('https://docs.google.com/document/d/1FmijOedXk1TOUkgy39xL_714zeG4mXBIHhQuI9nZS20')}
                    />
                    <Divider />
                    <ProfileSettingItem
                        text='개인정보수집약관'
                        onPress={() => Linking.openURL('https://docs.google.com/document/d/1imMytH_puooCflrw1Ln9kuSMaVYw8Pi7PVdyOw7lA-E')}
                    />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 16}}>
                    <RoundButton
                        text='로그아웃'
                        containerStyle={{marginRight: 16}}
                        onPress={goOut}
                    />
                    <RoundButton
                        text='계정삭제'
                        onPress={membershipWidthraw}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default UserAccountSetting;