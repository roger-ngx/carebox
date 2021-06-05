import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const IdeaHeart = ({count}) => {

    return (
        <View
            style={{flexDirection: 'row', alignItems: 'center'}}
        >
            <Icon
                name='favorite-border'
                color='#A1A99E'
            />
            <Text style={{color: '#A1A99E', fontWeight: '500', fontSize: 20}}>{count}</Text>
        </View>
    )
}

export default IdeaHeart;