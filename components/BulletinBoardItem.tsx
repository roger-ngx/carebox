import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { map, size, includes } from 'lodash';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ExpandableText from './ExpandableText';
import LikeCommentNumber from './LikeCommentNumber';
import { likeBulletinItem, unlikeBulletinItem } from '../firebase/BulletinRepository';

const BulletinBoardItem = ({item, containerStyle}) => {

    const user = useSelector(state => state.user.currentUser)

    const [ liked, setLiked ] = useState();
    const [ likeNumber, setLikeNumber ] = useState();
    const [ diffInMinites, setDiffInMinutes ] = useState();
    const [ time, setTime ] = useState();

    useEffect(() => {
        setDiffInMinutes(moment().diff(moment.unix(item.createdAt.seconds), 'minutes'));

        const interval = setInterval(() => { 
            setDiffInMinutes(moment().diff(moment.unix(item.createdAt.seconds), 'minutes'));
        }, 60000);

        return () => clearInterval(interval);
    }, [item]);

    useEffect(() => {
        if(!diffInMinites) return ;
        console.log('diffInMinites', diffInMinites)

        let ret = diffInMinites;
        let unit = '분';
        if(ret > 60){
            ret = diffInMinites/60;
            unit = '시간';

            if(ret > 24){
                ret = ret / 24;
                unit = '일';
            }
    
            if(ret > 30){
                ret = ret / 30;
                unit = '개월';
            }
    
            if(ret > 12){
                ret=ret/12;
                unit = '년';
            }
        }

        setTime(`${ret|0}${unit} 전`);
    }, [diffInMinites]);

    useEffect(() => {
        setLiked(includes(item.likes, user.uid));
        setLikeNumber(size(item.likes));
    }, [item]);

    const onLikeComment = async () => {
        if(liked){
            const ret = await unlikeBulletinItem(item.id, user.uid);
            if(ret){
                setLiked(false);
                setLikeNumber(likeNumber - 1);
            }
        }else{
            const ret = await likeBulletinItem(item.id, user.uid);
            if(ret){
                setLiked(true);
                setLikeNumber(likeNumber + 1);
            }
        }
    }

    return (<View style={[{width: '100%', backgroundColor: 'white', borderRadius: 10, padding: 20}, containerStyle]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FastImage
                    style={{width: 32, height: 32, borderRadius: 16, marginRight: 8}}
                    source={{uri: item.owner.profileImageUrl}}
                />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{color: '#1379FF', marginBottom: 4}}>{item.type}</Text>
                    <Text style={{color: '#1D395F', fontSize: 14}}>{item.owner.nickName}</Text>
                </View>
            </View>
            <Text style={{color: '#1D395F', fontSize: 12}}>{time}</Text>
        </View>
        <Divider style={{marginVertical: 16}}/>
        <View>
            <ExpandableText
                text={item.content}
                maxLength={100}
                containerStyle={{marginBottom: 16}}
            />
            <ScrollView
                horizontal
                style={{marginBottom: 20}}
                showsHorizontalScrollIndicator={false}
            >
                {
                    map(item.images, image => (
                        <FastImage
                            key={image}
                            style={{width: 100, height: 100, marginRight: 8}}
                            source={{uri: image}}
                        />
                    ))
                }
            </ScrollView>
            <LikeCommentNumber
                liked={liked}
                commentNumber={item.commentCount}
                likeNumber={likeNumber}
                onLikeComment={onLikeComment}
            />
        </View>
    </View>)
}

export default BulletinBoardItem;