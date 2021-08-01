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
import ImageGalleryModal from '../modals/ImageGalleryModal';

const IdeaDetailScreen = ({idea}) => {
    if(!idea) return null;
    const [ openGalleryModal, setOpenGalleryModal ] = useState(-1);

    const user = useSelector(state => state.user.currentUser);

    const { id, detail, images, links } = idea;

    const [ showingCommentRegistrationModal, setShowingCommentRegistrationModal ] = useState(false);

    const solutionKeys = keys(detail.solution);
    const solutionValues = values(detail.solution);

    console.log(images.urls);

    return (
        <View
            style={{flex: 1, backgroundColor: 'white'}}
        >
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <PickedIdea idea={idea}/>
                <Divider/>
                <View style={{padding: 20}}>
                    <View style={{marginBottom: 24}}>
                        <Text style={{color: '#898989', marginBottom: 8}}>구체적 대상</Text>
                        <Text style={{color: '#334F74', fontSize: 16}}>{detail.object}</Text>
                    </View>
                    <View style={{marginBottom: 24}}>
                        <Text style={{color: '#898989', marginBottom: 8}}>구체적 상황</Text>
                        <Text style={{color: '#334F74', fontSize: 16}}>{detail.situation}</Text>
                    </View>
                    <View style={{marginBottom: 24}}>
                        <Text style={{color: '#898989', marginBottom: 8}}>해결방법</Text>
                        {
                            map(solutionKeys, (key, index) => {

                                const [sign, text] = split(key, ' : ');

                                return (<View style={{marginBottom: 12}} key={key}>
                                    <OutlinedTag
                                        sign={sign}
                                        text={text}
                                        style={{alignSelf: 'flex-start', marginLeft: 0}}
                                    />
                                    <Text style={{color: '#334F74', fontSize: 16, marginTop: 4}}>{solutionValues[index]}</Text>
                                </View>)
                            })
                        }
                    </View>
                </View>
                <Divider />
                <View style={{padding: 20}}>
                    <Text style={{color: '#7D7D7D', marginBottom: 8}}>이미지</Text>
                    <ScrollView
                        horizontal
                        style={{marginBottom: 20}}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            map(images.urls, (image, index) => (
                                <TouchableOpacity
                                    onPress={() => setOpenGalleryModal(index)}
                                >
                                    <FastImage
                                        style={{width: 150, height: 150, marginRight: 8}}
                                        source={{uri: image}}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                    <Text  style={{color: '#334F74', fontSize: 16}}>{images.title}</Text>
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
            {
                openGalleryModal >= 0 &&
                <ImageGalleryModal
                    onClose={() => setOpenGalleryModal(-1)}
                    imageUris={images.urls}
                    initialPage={openGalleryModal}
                />
            }
        </View>
    )
}

export default IdeaDetailScreen;