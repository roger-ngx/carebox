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
        <SafeAreaView>
            <View style={{padding: 20}}>
                <TitleNavigationBar
                    onBackPress={() => navigation.pop()}
                    title='알림'
                    containerStyle={{marginBottom: 16}}
                />
                <FlatList
                    data={notifications}
                    renderItem={
                        ({item}) => {
                            const { id, ideaId, commentUser, unRead } = item;
                            return (
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center'}}
                                    onPress={() => readNotification(ideaId, id, unRead)}
                                >
                                    <Image
                                        style={{width: 50, height: 50, marginRight: 16}}
                                        source={require('assets/icons/notification.png')}
                                    />
                                    <Text style={{flex: 1}}>{commentUser.nickName} {item.type}</Text>
                                </TouchableOpacity>
                            )
                        }
                    }
                    ItemSeparatorComponent={() => <Divider style={{marginVertical: 16}}/>}
                    ListEmptyComponent={() => (<Text>No notifications</Text>)}
                />
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen;