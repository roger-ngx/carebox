import React from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-elements';

const Rating = ({type, rate}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: '#434A3F', marginRight: 12}}>{type}</Text>
        <AirbnbRating
            defaultRating={+rate}
            size={20}
            showRating={false}
        />
        <Text style={{color: '#434A3F', marginLeft: 4}}>{rate}</Text>
    </View>
)

const RatingView = () => (
    <View>
        <Rating type='실용성' rate='4.0' />
        <Rating type='창의성' rate='4.5' />
        <Rating type='가치성' rate='4.2' />
    </View>
)

export default RatingView;