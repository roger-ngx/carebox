import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { remove } from 'lodash';
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

    const deleteComment = async (selectedComment) => {
        console.log(selectedComment);
        const {id, ideaId} = selectedComment;
        if(!id || !ideaId){
            return;
        }
        setLoading(true);

        try{
            const ret = await deleteIdeaComment(ideaId, id);
            if(ret){
                remove(comments, comment => comment.id === selectedComment.id);
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

            <View style={{flex: 1}}>
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
                                    onPress={() => deleteComment(item.comment)}
                                    disabled={loading}
                                >
                                    {
                                        loading ?
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
                />
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