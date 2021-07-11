import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image'
import { Divider } from 'react-native-elements';
import CommentInputModal from '../modals/CommentInputModal';
import { useDispatch, useSelector } from 'react-redux';
import { includes, map, reduce, size, throttle } from 'lodash';

import IdeaOverallRating from 'components/IdeaOverallRating';
import NewIdeaHead from 'components/Idea/NewIdeaHead';
import OutlinedTag from 'components/OutlinedTag';
import ExpandableText from 'components/ExpandableText';
import RatingView from 'components/RatingView';
import LikeCommentNumber from 'components/LikeCommentNumber';
import { addIdeaCommentsListenner } from 'firebase/IdeaRepository';
import { addReplyToComment, getIdeaCommentReplies, likeIdeaComment, pickAnIdea } from '../firebase/IdeaRepository';
import CommentListModal from '../modals/CommentListModal';
import ExternalLink from '../components/ExternalLink';
import UserComment from '../components/UserComment';
import RoundButton from '../components/RoundButton';
import CBButton from '../components/CBButton';
import InfoModal from '../modals/InfoModal';

const Comment = ({user, comment, showCommentInput, onShowComments}) => {

    const [ subCommentCount, setSubCommentCount ] = useState();
    const [ latestSubComment, setLatestSubComment ] = useState();

    
    const {
        ideaId, practicalityRate, creativityRate, valuableRate, avgRating,
        scamper, content, links, images, likes
    } = comment;
    
    const scamperSplits = scamper.split(' : ');
    
    useEffect(() => {
        getSubCommentCount();
    }, [comment]);

   const getSubCommentCount = async () => {
        const ret = await getIdeaCommentReplies(ideaId, comment.id);
        setSubCommentCount(ret?.count);
        setLatestSubComment(ret?.lastReply);
    }

    const likeComment = () => {
        likeIdeaComment({ideaId, commentId: comment.id, uid: user.uid, isLike: true})
    }

    return (<View>
        <View style={{marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#434A3F', marginBottom: 8}}>종합평점 <Text style={{fontWeight: 'bold', fontSize: 16, color: '#1379FF'}}>{avgRating}점</Text></Text>
            <RatingView {...{practicalityRate, creativityRate, valuableRate}}/>
        </View>
        <View style={{marginBottom: 10}}>
            <OutlinedTag
                sign={scamperSplits[0]}
                text={scamperSplits[1]}
                style={{alignSelf: 'flex-start'}}
            />
        </View>
        <View style={{marginBottom: 10}}>
            <ExpandableText text={content}/>
        </View>

        <ScrollView
            horizontal
            style={{marginBottom: 20}}
            showsHorizontalScrollIndicator={false}
        >
            {
                map(images, image => (
                    <FastImage
                        style={{width: 150, height: 150, marginRight: 8}}
                        source={{uri: image}}
                    />
                ))
            }
        </ScrollView>
        
        <View style={{marginBottom: 32}}>
            {
                map(links, link => <ExternalLink title={link.externalLinkTitle} link={link.externalLink}/>)
            }
        </View>

        <View style={{marginBottom: 10}}>
            <LikeCommentNumber
                liked={includes(likes, user.uid)}
                likeNumber={size(likes)}
                commentNumber={subCommentCount}
                onLikeComment={likeComment}
            />
        </View>
        
        <Divider/>

        {
            !!latestSubComment &&
            <UserComment
                user={latestSubComment.owner}
                comment={latestSubComment.comment}
            />
        }
        {
            (subCommentCount > 0) &&
            <TouchableOpacity
                style={{paddingBottom: 10}}
                onPress={onShowComments}
            >
                <Text style={{color: '#898989'}}>댓글 {subCommentCount}개 모두 보기</Text>
            </TouchableOpacity>
        }

        <TouchableOpacity
            style={{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: 'white',
                paddingVertical: 16,
                alignItems: 'center'
            }}
            onPress={showCommentInput}
        >
            <FastImage
                style={{width: 32, height: 32, borderRadius: 32}}
                source={
                    user.profileImageUrl ?
                    {uri: user.profileImageUrl} :
                    require('assets/icons/person.png')
                }
            />
            <View pointerEvents='none'>
                <TextInput 
                    style={{flex: 1, color: '#898989', marginLeft: 8}}
                    placeholder='댓글 달기...'
                    editable={false}
                    rejectResponderTermination={true}
                />
            </View>
        </TouchableOpacity>
    </View>
)}

const IdeaCommentScreen = ({idea}) => {
    if(!idea) return null;

    const [ showCommentInputModal, setShowCommentInputModal ] = useState(false);
    const [ showInnerCommentsModal, setShowInnerCommentsModal ] = useState(false);
    const [ selectedComment, setSelectedComment ] = useState({});

    const [ isShowingConfirmToPick, setShowingConfirmToPick ] = useState(false);

    const [ isPickedIdeaSuccessful, setPickedIdeaSuccessful ] = useState(false);

    const [ overallRate, setOverallRate ] = useState({});

    const [ loading, setLoading ] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userProfileData);

    useEffect(() => {
        if(idea){
            const unsubcriber = addIdeaCommentsListenner(idea.id, dispatch);
    
            return () => typeof unsubcriber === 'function' && unsubcriber();
        }
    }, [idea.id]);

    useEffect(() => {
        const { rating } = idea;

        const overallRate = reduce(rating, (sum, rate) => {
            sum.avg = sum.avg + rate.avgRating;
            sum.creativity += rate.creativityRate;
            sum.practicality += rate.practicalityRate;
            sum.valuable += rate.valuableRate;

            return sum;
        }, {avg: 0, creativity: 0, practicality: 0, valuable: 0});

        const ratingSize = size(rating);

        if(ratingSize > 0){
            return setOverallRate({
                avg: +(overallRate.avg/ratingSize).toFixed(1),
                creativity: +(overallRate.creativity/ratingSize).toFixed(1),
                practicality: +(overallRate.practicality/ratingSize).toFixed(1),
                valuable: +(overallRate.valuable/ratingSize).toFixed(1)
            })
        }

        return setOverallRate(overallRate);

    }, [idea]);

    const comments = useSelector(state => state.idea.comments)

    onSubmitComment = async (parentCommentId, comment) => {
        setLoading(true);

        const ret = await addReplyToComment({parentCommentId, comment, owner: user, ideaId: idea.id})

        if(ret){
            setShowCommentInputModal(false);
        }

        setLoading(false);
    }

    onShowInnerComments = (comment) => {
        setShowInnerCommentsModal(true);
        setSelectedComment(comment);
    }

    const pickIdea = async () => {
        setLoading(true);
        try{
            await pickAnIdea({uid: user.uid, ideaId: idea.id, commentId: isShowingConfirmToPick});
        }catch(ex){
            console.log('pickIdea', ex)
        }

        setPickedIdeaSuccessful(true);
        // setShowingConfirmToPick(null);
        setLoading(false);
    }

    return (
        <ScrollView>
            <IdeaOverallRating overallRate={overallRate}/>
            {
                map(comments, comment => (
                    <>
                        <View style={{padding: 20}}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20}}>
                                <NewIdeaHead owner={comment.owner}/>
                                
                                <CBButton
                                    text='Pick하기'
                                    onPress={() => setShowingConfirmToPick(comment.id)}
                                />
                            </View>

                            <Comment
                                user={user}
                                comment={comment}
                                showCommentInput={() => setShowCommentInputModal(true)}
                                onShowComments={() => onShowInnerComments(comment)}
                            />
                        </View>
                        {
                            showCommentInputModal &&
                            <CommentInputModal
                                profileImageUrl={user.profileImageUrl}
                                onClose={() => setShowCommentInputModal(false)}
                                onSubmitComment={cmt => onSubmitComment(comment.id, cmt)}
                                loading={loading}
                            />
                        }
                    </>
                ))
            }
            <CommentListModal
                isVisible={showInnerCommentsModal}
                onClose={() => setShowInnerCommentsModal(false)}
                parentComment={selectedComment}
                user={user}
                onSubmitComment={onSubmitComment}
            />
            {
                Boolean(isShowingConfirmToPick) &&
                <InfoModal isVisible={Boolean(isShowingConfirmToPick)} onClose={() => setShowingConfirmToPick(false)}>
                    <Text style={{fontSize: 24, color: '#1D395F', marginBottom: 24}}>
                        Pick하기
                    </Text>
                    <Text style={{textAlign: 'center', color: '#001240', lineHeight: 24, marginBottom: 24}}>
                        {`pick을 하면 같은 팀으로 활동할 수 있어요!\n000님을 아이디어 참여자로 pick 하시겠어요?`}
                    </Text>
                    <RoundButton
                        text='확인'
                        loading={loading}
                        onPress={throttle(pickIdea, 5000, { trailing: false })}
                    />
                </InfoModal>
            }
        </ScrollView>
    )
}

export default IdeaCommentScreen;