import React from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-elements';

const Rating = ({type, rate, isDisabled}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: '#434A3F', marginRight: 12}}>{type}</Text>
        <AirbnbRating
            defaultRating={+rate}
            size={20}
            showRating={false}
            isDisabled={isDisabled}
        />
        <Text style={{color: '#434A3F', marginLeft: 4}}>{rate}</Text>
    </View>
)

const RatingView = ({practicalityRate, creativityRate, valuableRate, isDisabled}) => (
    <View>
        <Rating type='실용성' rate={practicalityRate} isDisabled={isDisabled}/>
        <Rating type='창의성' rate={creativityRate} isDisabled={isDisabled}/>
        <Rating type='가치성' rate={valuableRate} isDisabled={isDisabled}/>
    </View>
)

export default RatingView;