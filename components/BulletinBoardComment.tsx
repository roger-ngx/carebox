import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { map, size, includes } from 'lodash';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ExpandableText from './ExpandableText';
import LikeCommentNumber from './LikeCommentNumber';
import { likeBulletinItem, unlikeBulletinItem, getBulletinItemById } from '../firebase/BulletinRepository';
import ImageGalleryModal from '../modals/ImageGalleryModal';

const BulletinBoardComment = ({item, containerStyle}) => {
    if(!item) return null;

    const [ itemDetail, setItemDetail ] = useState({});

    const { bulletinItemId, comment, commentId } = item;

    useEffect(() => {
        getItem(bulletinItemId);
    }, [bulletinItemId]);

    const getItem = async (id) =>{
        const item = await getBulletinItemById(id);
        setItemDetail(item);
    }

    const { type, images, content } = itemDetail;

    const owner = comment.owner;

    const user = useSelector(state => state.user.currentUser)

    const [ openGalleryModal, setOpenGalleryModal ] = useState(-1);

    return (<View style={[{width: '100%', backgroundColor: 'white', borderRadius: 10, padding: 20}, containerStyle]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
                style={{width: 32, height: 32, borderRadius: 16, marginRight: 8}}
                source={owner.profileImageUrl ? {uri: owner.profileImageUrl} : require('assets/icons/person.png')}
            />
            <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#1379FF', marginBottom: 4}}>{type}</Text>
                <Text style={{color: '#1D395F', fontSize: 14}}>{owner.nickName}</Text>
            </View>
        </View>
        <Divider style={{marginVertical: 16}}/>
        <View>
            <ExpandableText
                text={content}
                maxLength={100}
                containerStyle={{marginBottom: 16}}
            />
            <ScrollView
                horizontal
                style={{marginBottom: 20}}
                showsVerticalScrollIndicator={false}
            >
                {
                    map(images, (image, index) => (
                        <TouchableOpacity onPress={() => setOpenGalleryModal(index)}>
                            <FastImage
                                 key={image}
                                 style={{width: 100, height: 100, marginRight: 8}}
                                 source={{uri: image}}
                            />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <View style={{padding: 12, backgroundColor: '#DCDCDC', borderRadius: 8}}>
                <Text style={{color: '#334F74'}}>{comment.comment}</Text>
            </View>
        </View>
        {
            openGalleryModal >= 0 &&
            <ImageGalleryModal
                onClose={() => setOpenGalleryModal(-1)}
                imageUris={images}
                initialPage={openGalleryModal}
            />
        }
    </View>)
}

export default BulletinBoardComment;