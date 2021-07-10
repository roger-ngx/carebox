import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import PickedIdea from '../components/Idea/PickedIdea';
import { Divider, Icon } from 'react-native-elements';
import { map, includes, size, keys, values, split } from 'lodash';
import IdeaCommentButtons from '../components/IdeaCommentButtons';
import CommentRegistrationModal from '../modals/CommentRegistrationModal';
import { useDispatch, useSelector } from 'react-redux';
import { likeIdea, addIdeaListenner } from '../firebase/IdeaRepository';
import ExternalLink from '../components/ExternalLink';
import FastImage from 'react-native-fast-image';
import OutlinedTag from '../components/OutlinedTag';

const IdeaDetailScreen = ({idea}) => {
    if(!idea) return null;

    const user = useSelector(state => state.user.currentUser);

    const { id, detail, images, links } = idea;

    const [ showingCommentRegistrationModal, setShowingCommentRegistrationModal ] = useState(false);

    const solutionKeys = keys(detail.solution);
    const solutionValues = values(detail.solution);

    return (
        <View
            style={{flex: 1, backgroundColor: 'white'}}
        >
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <PickedIdea idea={idea}/>
                <Divider/>
                <View style={{padding: 20}}>
                    <View style={{marginBottom: 8}}>
                        <Text style={{color: '#898989', marginBottom: 2}}>구체적 대상</Text>
                        <Text style={{color: '#334F74', fontSize: 16}}>{detail.object}</Text>
                    </View>
                    <View style={{marginBottom: 8}}>
                        <Text style={{color: '#898989', marginBottom: 2}}>구체적 상황</Text>
                        <Text style={{color: '#334F74', fontSize: 16}}>{detail.situation}</Text>
                    </View>
                    <View style={{marginBottom: 8}}>
                        <Text style={{color: '#898989', marginBottom: 2}}>해결방법</Text>
                        {
                            map(solutionKeys, (key, index) => {

                                const [sign, text] = split(key, ' : ');

                                return (<View style={{marginTop: 8}} key={key}>
                                    <OutlinedTag
                                        sign={sign}
                                        text={text}
                                        style={{alignSelf: 'flex-start', marginLeft: 0}}
                                    />
                                    <Text style={{color: '#334F74', fontSize: 16}}>{solutionValues[index]}</Text>
                                </View>)
                            })
                        }
                    </View>
                </View>
                <Divider />
                <View style={{padding: 20}}>
                    <Text style={{color: '#7D7D7D', marginBottom: 8}}>이미지</Text>
                    {
                        map(images, ({title, url}) => (<View key={title}>
                            <FastImage style={{height: 150, marginBottom: 8}} source={{uri: url}} />
                            <Text  style={{color: '#334F74', fontSize: 16}}>{title}</Text>
                        </View>))
                    }
                </View>
                <Divider />
                <View style={{padding: 20, marginBottom: 120}}>
                    <Text style={{color: '#7D7D7D', marginBottom: 8}}>링크</Text>
                    {
                        map(links, link => <ExternalLink key={link.title} title={link.title} link={link.url}/>)
                    }
                </View>
            </ScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0, left: 0,
                    paddingVertical: 8,
                    width: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center'
                }}
            >
                <IdeaCommentButtons
                    onCommentRegister={() => setShowingCommentRegistrationModal(true)}
                    onFavorite={() => likeIdea({ideaId: id, uid: user.uid, isLike: !includes(idea.likes, user.uid)})}
                    liked={includes(idea.likes, user.uid)}
                />
            </View>
            {
                showingCommentRegistrationModal &&
                <CommentRegistrationModal
                    ideaId={idea.id}
                    onClose={() => setShowingCommentRegistrationModal(false)}
                />
            }
        </View>
    )
}

export default IdeaDetailScreen;