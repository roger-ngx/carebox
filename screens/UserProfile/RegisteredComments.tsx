import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { remove, size } from 'lodash';
import { ActivityIndicator } from 'react-native-paper';

import TitleNavigationBar from '../../components/TitleNavigationBar';
import { getRegisteredComments } from '../../firebase/UserRepository';
import { Divider } from 'react-native-elements';
import NewIdea from '../../components/Idea/NewIdea';
import CommentRegistrationModal from '../../modals/CommentRegistrationModal';
import { deleteIdeaComment } from '../../firebase/IdeaRepository';

const RegisteredComments = ({navigation}) => {

    const [comments, setComments] = useState([]);
    const [ selectedComment, setSelectedComment ] = useState();
    const [ loading, setLoading ] = useState(false);

    const [ openCommentEditModal, setOpenCommentEditModal ] = useState(false);

    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        user && getComments(user.uid);
    }, [user]);

    const getComments = async (uid) => {
        if(uid){
            const ret = await getRegisteredComments(uid);
            setComments(ret);
        }
    }

    const editComment = (comment) => {
        setSelectedComment(comment);
        setOpenCommentEditModal(true);
    }

    const deleteComment = async ({id, ideaId, commentId}) => {
        if(!ideaId || !commentId){
            return;
        }
        setLoading(true);

        try{
            const ret = await deleteIdeaComment({ownerUid: user.uid, historyCommentId:id, ideaId, ideaCommentId: commentId});
            if(ret){
                remove(comments, comment => comment.id === id);
                setComments([...comments]);
            }
        }catch(ex){
            console.log('deleteComment', ex);
        }

        setLoading(false);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center'}}>
                <TitleNavigationBar
                    title='내가 등록한 코멘트'
                    containerStyle={{paddingVertical: 8}}
                    onBackPress={() => navigation.pop()}
                />
            </View>
            <Divider />

            <View style={{flex: 1}}>
            {
                !size(comments) ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('assets/icons/idea_border.png')} style={{width: 84, height: 84}}/>             
                    <Text style={{textAlign: 'center', color: '#334F74', fontSize: 16, marginTop: 24}}>아직 등록한 코멘트가 없습니다</Text>
                </View>
                :
                <FlatList
                    data={comments}
                    renderItem={({item}) => (<View style={{backgroundColor: 'white', marginBottom: 20, borderRadius: 10}}>
                        <NewIdea idea={item.idea} />
                        <View style={{padding: 20, paddingTop: 0}}>
                            <Divider />
                            <Text style={{marginTop: 20, fontSize: 16, color: '#334F74'}}>
                                {item.comment.content}
                            </Text>
                            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#898989',
                                        borderRadius: 30,
                                        paddingVertical: 12,
                                        width: 100,
                                        alignItems: 'center',
                                        marginRight: 16
                                    }}
                                    onPress={() => editComment(item.comment)}
                                    disabled={loading}
                                >
                                    <Text style={{color: '#6B7A8E'}}>수정</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#898989',
                                        borderRadius: 30,
                                        paddingVertical: 12,
                                        width: 100,
                                        alignItems: 'center'
                                    }}
                                    onPress={() => deleteComment(item)}
                                    disabled={loading}
                                >
                                    {
                                        (loading && setSelectedComment.id===item.id) ?
                                        <ActivityIndicator size='small' color='#6B7A8E' />
                                        :
                                        <Text style={{color: '#6B7A8E'}}>삭제</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}
                    keyExtractor={item => item.id}
                    style={{padding: 20}}
                    ListFooterComponent={() => <View style={{height: 100}} />}
                />
            }
            </View>
            {
                openCommentEditModal &&
                <CommentRegistrationModal
                    ideaId={selectedComment.ideaId}
                    onClose={() => setOpenCommentEditModal(false)}
                    initData={selectedComment}
                />
            }
        </SafeAreaView>
    )
}

export default RegisteredComments;