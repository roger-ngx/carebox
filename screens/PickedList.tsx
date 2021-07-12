import React from 'react';
import { View, FlatList } from 'react-native';
import Profile from 'components/Profile';

const PickedList = ({picks}) => {

    if(!picks) return null;

    return (
        <View style={{padding: 20}}>

            <FlatList
                data={picks}
                renderItem={({item}) => (<Profile user={item}/>)}
                keyExtractor={item=>item.uid}
            />

        </View>
    )
}

export default PickedList;