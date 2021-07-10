import React from 'react';
import { View, FlatList } from 'react-native';
import Profile from 'components/Profile';

const PickedList = ({pickes}) => {

    if(!pickes) return null;

    return (
        <View style={{padding: 20}}>

            <FlatList
                data={pickes}
                renderItem={({item}) => (<Profile user={item}/>)}
                keyExtractor={item=>item.uid}
            />

        </View>
    )
}

export default PickedList;