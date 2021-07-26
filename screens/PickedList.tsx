import React from 'react';
import { View, FlatList, TouchableOpacity, Linking } from 'react-native';
import Profile from 'components/Profile';
import { Icon } from 'react-native-elements';

const PickedUser = ({user}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Profile user={user} avatarType='circle'/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                style={{
                    padding: 8,
                    marginRight: 8
                }}
                onPress={() => Linking.openURL(`sms:${user.phoneNumber}`)}
            >
                <Icon
                    type='material-community'
                    name='chat-processing-outline'
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    padding: 8,
                }}
                onPress={() => Linking.openURL(`tel:${user.phoneNumber}`)}
            >
                <Icon
                    type='material-community'
                    name='phone'
                />
            </TouchableOpacity>
        </View>
    </View>
)

const PickedList = ({picks}) => {

    if(!picks) return null;

    return (
        <View style={{padding: 20}}>

            <FlatList
                data={picks}
                renderItem={({item}) => (<PickedUser user={item} />)}
                keyExtractor={item=>item.uid}
                ItemSeparatorComponent={() => (<View style={{height: 16}} />)}
            />

        </View>
    )
}

export default PickedList;