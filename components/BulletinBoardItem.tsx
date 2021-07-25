import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { map, size, includes } from 'lodash';
import { useSelector } from 'react-redux';

import ExpandableText from './ExpandableText';
import LikeCommentNumber from './LikeCommentNumber';
import { likeBulletinItem, unlikeBulletinItem } from '../firebase/BulletinRepository';

const BulletinBoardItem = ({item, containerStyle}) => {

    const user = useSelector(state => state.user.currentUser)

    const [ liked, setLiked ] = useState();
    const [ likeNumber, setLikeNumber ] = useState();

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
                    <Text>{item.owner.nickName}</Text>
                </View>
            </View>
            <Text>1분 전</Text>
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