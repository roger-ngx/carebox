import React from 'react';
import { View, Text } from 'react-native';
import { map, reduce, size } from 'lodash';
import moment from 'moment';

import ContainedTag from '../ContainedTag';
import OutlinedTag from '../OutlinedTag';
import IdeaRate from './IdeaRate';
import IdeaHeart from './IdeaHeart';

const IdeaBody = ({idea}) => {
    if(!idea) return null;

    const {category, scampers, subject, createdAt, likes, commentCount=0, rating } = idea;

    const avgRating = size(rating) > 0 ? reduce(rating, (sum, rate) => {
        return sum + rate.avgRating
    }, 0) / size(rating) : 0;

    return (
        <>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 16, marginLeft: -4}}>
                <ContainedTag text={category}/>
                {
                    map(scampers, scamper => {
                        const [sign, text] = scamper.split(' : ');

                        return (<OutlinedTag text={text} sign={sign}/>)
                    })
                }
            </View>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
                {subject}
            </Text>
            <IdeaRate count={commentCount} rate={avgRating} isDisabled={true} containerStyle={{marginLeft: -3}}/>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    alignItems: 'center'
                }}
            >
                <Text style={{color: '#898989'}}>{createdAt && moment.unix(createdAt.seconds).format('YYYY.MM.DD')}</Text>
                <IdeaHeart count={size(likes)}/>
            </View>

        </>
    )
}

export default IdeaBody;