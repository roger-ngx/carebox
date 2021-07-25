import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { split, map, includes, size } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const BulletinItemDetailScreen = ({navigation, route}) => {

    const { item } = route.params;

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
        <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
                <View style={{marginBottom: 16}}>
                    <TitleNavigationBar
                        onBackPress={() => navigation.pop()}
                    />
                </View>
                <ScrollView>
                    <BulletinBoardItem item={item} containerStyle={{paddingHorizontal: 0}}/>
                    <Divider />
                    {
                        map(comments, ({id, owner, comment}) => (
                            <UserComment
                                key={id}s
                                user={owner}
                                comment={comment}
                            />
                        ))
                    }
                </ScrollView>
                <Divider style={{height: 4, marginHorizontal: -20}}/>
                <CommentInput
                    profileImageUrl={user&&user.profileImageUrl}
                    containerStyle={{paddingHorizontal: 0}}
                    onSubmit={onSubmitComment}
                    loading={loading}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default BulletinItemDetailScreen;