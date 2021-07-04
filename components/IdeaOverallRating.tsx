import React from 'react';
import { View, Text } from 'react-native';
import { Icon, AirbnbRating } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import RatingView from './RatingView';

const IdeaOverallRating = ({overallRate}) => {
    const {avg, creativity, practicality, valuable} = overallRate;

    return (
        <View
            style={{flexDirection: 'row', backgroundColor: '#EFF4F5', padding: 20, justifyContent: 'space-between'}}
        >
            <View style={{justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 20}}>아이디어 총 평점</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='grade' color='#FFC700' size={36}/>
                    <View style={{flexDirection: 'row', height: 36}}>
                        <Text style={{fontWeight: 'bold', fontSize: 32}}>{avg}</Text>
                        <Text style={{color: '#919EAE', alignSelf: 'flex-end'}}>/5</Text>
                    </View>
                </View>
            </View>
            <Divider orientation='vertical' width={1} color='#9C9C9C'/>
            <RatingView practicalityRate={practicality} creativityRate={creativity} valuableRate={valuable}/>
        </View>
    )
}

export default IdeaOverallRating;