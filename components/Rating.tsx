import React from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-elements';

const Rating = ({title, onFinishRating}) => {

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: '#434A3F', marginRight: 16}}>{title}</Text>
            <AirbnbRating
                showRating={false}
                size={40}
                onFinishRating={onFinishRating}
            />
        </View>
    )
}

export default Rating;