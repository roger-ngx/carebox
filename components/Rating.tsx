import React from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-elements';

const Rating = ({title, rate, onFinishRating}) => {

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
            <Text style={{fontSize: 16, color: '#434A3F', marginRight: 16}}>{title}</Text>
            <AirbnbRating
                showRating={false}
                size={32}
                defaultRating={rate}
                onFinishRating={onFinishRating}
            />
        </View>
    )
}

export default Rating;