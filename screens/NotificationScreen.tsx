import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { orderBy } from 'lodash';
import moment from 'moment';

import TitleNavigationBar from '../components/TitleNavigationBar';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { markReadingNotification } from '../firebase/UserRepository';

const NotificationItem = ({item, navigation}) => {
    const [ diffInMinites, setDiffInMinutes ] = useState();
    const [ time, setTime ] = useState();

    useEffect(() => {
        setDiffInMinutes(moment().diff(moment.unix(item.createdAt.seconds), 'minutes'));

        const interval = setInterval(() => { 
            setDiffInMinutes(moment().diff(moment.unix(item.createdAt.seconds), 'minutes'));
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const user = useSelector(state => state.user.currentUser);

    const readNotification = async ({ideaId, notificationId, unRead}) => {
        console.log(ideaId, notificationId, unRead);

        try{
            unRead && await markReadingNotification(user.uid, notificationId);
            ideaId && navigation.navigate('Idea', {ideaId: ideaId})
        }catch(ex){
            console.log(ex);
        }
    }

    useEffect(() => {
        if(!diffInMinites) return ;
        console.log('diffInMinites', diffInMinites)

        let ret = diffInMinites;
        let unit = '분';
        if(ret > 60){
            ret = diffInMinites/60;
            unit = '시간';

            if(ret > 24){
                ret = ret / 24;
                unit = '일';
            }
    
            if(ret > 30){
                ret = ret / 30;
                unit = '개월';
            }
    
            if(ret > 12){
                ret=ret/12;
                unit = '년';
            }
        }

        setTime(`${ret|0}${unit} 전`);
    }, [diffInMinites]);

        const { id, ideaId, commentUser, ideaOwner, unRead, type } = item;

        if(type==='ADMIN'){
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center', backgroundColor: unRead ? '#eee' : 'white', paddingVertical: 16, paddingHorizontal: 20}}
                    onPress={() => readNotification({notificationId: id, unRead})}
                >
                    <Image
                        style={{width: 50, height: 50, marginRight: 16}}
                        source={require('assets/icons/notification.png')}
                    />
                    <Text style={{flex: 1}}>{item.content}</Text>
                    <Text style={{color: '#666', marginLeft: 8}}>{time}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', backgroundColor: unRead ? '#eee' : 'white', paddingVertical: 16, paddingHorizontal: 20}}
                onPress={ () => readNotification({ideaId, notificationId: id, unRead}) }
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
                <Text style={{color: '#666', marginLeft: 8}}>{time}</Text>
            </TouchableOpacity>
        )
}

const NotificationScreen = ({navigation}) => {

    const [ diffInMinites, setDiffInMinutes ] = useState();
    const [ time, setTime ] = useState();

    const notifications = useSelector(state => state.user.userNotifications);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View>
                <TitleNavigationBar
                    onBackPress={() => navigation.pop()}
                    title='알림'
                    containerStyle={{marginVertical: 16, marginHorizontal: 20}}
                />
                <FlatList
                    data={orderBy(notifications, ['createdAt'], ['desc'])}
                    renderItem={
                        ({item}) => (<NotificationItem item={item} navigation={navigation}/>)
                    }
                    ItemSeparatorComponent={() => <Divider/>}
                    ListEmptyComponent={() => (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>알림이 없습니다.</Text></View>)}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen;