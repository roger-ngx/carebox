import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { map, reduce, size, includes, throttle } from 'lodash';
import moment from 'moment';
import { useSelector } from 'react-redux';

import ContainedTag from '../ContainedTag';
import OutlinedTag from '../OutlinedTag';
import IdeaRate from './IdeaRate';
import IdeaHeart from './IdeaHeart';
import { likeIdea } from '../../firebase/IdeaRepository';

const IdeaBody = ({idea}) => {
    if(!idea) return null;

    const currentUser = useSelector(state => state.user.currentUser);

    const {category, scampers, subject, createdAt, likes, commentCount=0, rating } = idea;

    const avgRating = size(rating) > 0 ? reduce(rating, (sum, rate) => {
        return sum + rate.avgRating
    }, 0) / size(rating) : 0;

    const likeThisIdea = () => likeIdea({ideaId: idea.id, uid: currentUser.uid, isLike: !includes(idea.likes, currentUser.uid)})

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
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    alignItems: 'center'
                }}
                onPress={throttle(likeThisIdea, 2000, {trailing: false})}
            >
                <Text style={{color: '#898989'}}>{createdAt && moment.unix(createdAt.seconds).format('YYYY.MM.DD')}</Text>
                <IdeaHeart liked={includes(likes, currentUser.uid)} count={size(likes)}/>
            </TouchableOpacity>
        </>
    )
}

export default IdeaBody;