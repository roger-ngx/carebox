import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import TitleNavigationBar from '../components/TitleNavigationBar';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { markReadingNotification } from '../firebase/UserRepository';

const NotificationScreen = ({navigation}) => {

    const notifications = useSelector(state => state.user.userNotifications);
    const user = useSelector(state => state.user.currentUser);

    const readNotification = async (ideaId, notificationId, unRead) => {
        try{
            unRead && await markReadingNotification(user.uid, notificationId);
            navigation.navigate('Idea', {ideaId: ideaId})
        }catch(ex){
            console.log(ex);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View>
                <TitleNavigationBar
                    onBackPress={() => navigation.pop()}
                    title='알림'
                    containerStyle={{marginVertical: 16, marginHorizontal: 20}}
                />
                <FlatList
                    data={notifications}
                    renderItem={
                        ({item}) => {
                            const { id, ideaId, commentUser, ideaOwner, unRead } = item;
                            return (
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center', backgroundColor: unRead ? '#eee' : 'white', paddingVertical: 16, paddingHorizontal: 20}}
                                    onPress={() => readNotification(ideaId, id, unRead)}
                                >
                                    <Image
                                        style={{width: 50, height: 50, marginRight: 16}}
                                        source={require('assets/icons/notification.png')}
                                    />
                                    {
                                        commentUser &&
                                        <Text style={{flex: 1}}>{commentUser.nickName} {item.type}</Text>
                                    }
                                    {
                                        ideaOwner &&
                                        <Text style={{flex: 1}}>{ideaOwner.nickName} {item.type}</Text>
                                    }
                                </TouchableOpacity>
                            )
                        }
                    }
                    ItemSeparatorComponent={() => <Divider/>}
                    ListEmptyComponent={() => (<Text>No notifications</Text>)}
                />
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen;