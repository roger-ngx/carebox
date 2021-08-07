import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { split, map, includes, size } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

import RatingView from '../components/RatingView';
import OutlinedTag from '../components/OutlinedTag';
import ExpandableText from '../components/ExpandableText';
import LikeCommentNumber from '../components/LikeCommentNumber';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import TitleNavigationBar from '../components/TitleNavigationBar';

import { useDispatch, useSelector } from 'react-redux';
import UserComment from '../components/UserComment';
import CommentInput from '../components/CommentInput';
import BulletinBoardItem from '../components/BulletinBoardItem';
import { onSubmitBulletinItemComment, addBulletinItemCommentsListenner, addBulletinItemListenner } from '../firebase/BulletinRepository';

const BulletinItemDetailModel = ({item, isVisible, onClose}) => {

    if(!item) return null;

    const dispatch = useDispatch();

    const comments = useSelector(state => state.bulletinBoard.comments);
    // const currentItem = useSelector(state => state.bulletinBoard.currentItem);

    const user = useSelector(state => state.user.userProfileData);

    const [ loading, setLoading ] = useState(false);
    
    const { id } = item;

    useEffect(() => {
        if(!id) return;

        // const unsubscriberItem = addBulletinItemListenner(id, dispatch);
        const unsubscriberComments = addBulletinItemCommentsListenner(id, dispatch);
        return () => {
            // typeof unsubscriberItem === 'function' && unsubscriberItem();
            typeof unsubscriberItem === 'function' && unsubscriberComments();
        }
    }, [id])

    const onSubmitComment = async (comment: string) => {
        setLoading(true);

        const ret = await onSubmitBulletinItemComment({bulletinItemId: id, comment, owner: user});
        if(!ret){
            Alert.alert('failed');
        }

        setLoading(false);
    }

    return (
        <Modal
            isVisible={isVisible}
            style={{margin: 0}}
            avoidKeyboard
            onBackButtonPress={onClose}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
                <View style={{marginTop: 16}}>
                    <TitleNavigationBar
                        onBackPress={onClose}
                    />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <BulletinBoardItem item={item} containerStyle={{paddingHorizontal: 0}}/>
                    <Divider />
                    <FlatList
                        data={comments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <UserComment
                                createdTime={item.createdAt}
                                key={item.id}s
                                user={item.owner}
                                comment={item.comment}
                            />
                        )}
                    />
                </ScrollView>
                <Divider style={{height: 4, marginHorizontal: -20}}/>
                <View style={{height: 60}}>
                    <CommentInput
                        profileImageUrl={user&&user.profileImageUrl}
                        containerStyle={{paddingHorizontal: 0}}
                        onSubmit={onSubmitComment}
                        loading={loading}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default BulletinItemDetailModel;