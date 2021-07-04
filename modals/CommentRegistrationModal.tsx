import React, { useState, useEffect }  from 'react';
import Modal from 'react-native-modal';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { map } from 'lodash';

import Rating from 'components/Rating';
import CBDropDownPicker from 'components/CBDropDownPicker';
import CBTextInput from 'components/CBTextInput';
import PhotoUploadButton from 'components/PhotoUploadButton';
import RoundButton from 'components/RoundButton';
import { addCommentToIdea } from '../firebase/IdeaRepository';
import CommentImagesUploader from '../components/CommentImagesUploader';

const CommentRegistrationModal = ({ideaId, ownerId, onClose}) => {
    console.log(ideaId);

    const [ practicalityRate, setPracticalityRate ] = useState(0);
    const [ creativityRate, setCreativityRate ] = useState(0);
    const [ valuableRate, setValuableRate ] = useState(0);
    const [ scamper, setScamper ] = useState();
    const [ content, setContent ] = useState();
    const [ externalLinks, setExternalLinks ] = useState(['']);
    const [ externalLinkTitles, setExternalLinkTitles ] = useState(['']);
    const [ processing, setProcessing ] = useState(false);
    const [ imageUris, setImageUris ] = useState();
    const [ showingFinishButton, setShowingFinishButton ] = useState(false);

    const onAddCommentToIdea = async () => {
        setProcessing(true);

        const links = map(externalLinks, (externalLink, index) => ({externalLink, externalLinkTitle: externalLinkTitles[index]}))

        const avgRating = +((practicalityRate + creativityRate + valuableRate) / 3).toFixed(1);

        const commentDoc = {
            ideaId, practicalityRate, creativityRate, valuableRate,
            scamper, content, links, avgRating
        }

        await addCommentToIdea({ideaId, ownerId, imageUris, commentDoc});
        setProcessing(false);
        onClose();
    }

    useEffect(() => {
        setShowingFinishButton(practicalityRate && creativityRate && valuableRate && scamper && content);
    }, [practicalityRate, creativityRate, valuableRate, scamper, content]);

    return (
        <Modal
            isVisible={true}
            style={{margin: 0}}
            avoidKeyboard={true}
            onBackButtonPress={onClose}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: 'white', padding: 20}}>
                <TouchableOpacity
                    style={{padding: 0, alignSelf: 'flex-end', padding: 8}}
                    onPress={onClose}
                >
                    <Icon
                        name='close'
                        color='#AEAEAE'
                    />
                </TouchableOpacity>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 32}}>
                        <Text style={{fontSize: 16, color: '#334F74', fontWeight: 'bold', marginBottom: 8}}>*아이디어를 평가해 주세요.</Text>
                        <Rating
                            title='실용성'
                            rate={practicalityRate}
                            onFinishRating={setPracticalityRate}
                        />
                        <Rating
                            title='창의성'
                            rate={creativityRate}
                            onFinishRating={setCreativityRate}
                        />
                        <Rating
                            title='가치성'
                            rate={valuableRate}
                            onFinishRating={setValuableRate}
                        />
                    </View>
                    <View style={{marginBottom: 32, position: 'relative'}}>
                        <CBDropDownPicker
                            placeholder='선택해 주세요.'
                            title='*Scamper 기법을 선택해 주세요.'
                            items={[
                                { label: 'S : 대체하기(소재, 방식, 원리)', value: 'S : 대체하기(소재, 방식, 원리)' },
                                { label: 'C : 조합하기(소재, 목적, 색, 기능)', value: 'C : 조합하기(소재, 목적, 색, 기능)' },
                                { label: 'A : 응용하기', value: 'A : 응용하기' },
                                { label: 'M : 수정, 확대, 축소하기', value: 'M : 수정, 확대, 축소하기' },
                                { label: 'P : 용도의 전환', value: 'P : 용도의 전환' },
                                { label: 'E : 제거하기', value: 'E : 제거하기' },
                                { label: 'R : 역발상', value: 'R : 역발상'}
                            ]}
                            value={scamper}
                            setValue={setScamper}
                        />
                    </View>
                    <View style={{marginBottom: 16, zIndex: -1}}>
                        <CBTextInput
                            title='*아이디어 코멘트를 남겨주세요.'
                            placeholder='입력해 주새요.'
                            multiline={true}
                            height={100}
                            maxLength={50}
                            textAlignVertical={'top'}
                            value={content}
                            onChangeText={setContent}
                        />
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 28}}>
                        <CommentImagesUploader
                            onImagesChange={setImageUris}
                        />
                    </View>
                    <View style={{marginBottom: 50}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4}}>
                            <Text style={{fontSize: 16, color: '#334F74'}}>링크</Text>
                            <TouchableOpacity
                                style={{padding: 4}}
                                onPress={() => {
                                    externalLinks.push('');
                                    externalLinkTitles.push('');

                                    setExternalLinks([...externalLinks]);
                                    setExternalLinkTitles([...externalLinkTitles]);
                                }}
                            >
                                <Icon
                                    name='add'
                                    color='#A1A1A1'
                                />
                            </TouchableOpacity>
                        </View>
                        {
                            map(externalLinks, (links, index) => (<View style={{marginBottom: 24}}>
                                <TextInput
                                    placeholder='입력해 주세요.'
                                    style={{
                                        borderRadius: 4, 
                                        borderColor: '#9C9C9C',
                                        borderWidth: 1,
                                        padding: 12,
                                        height: 50
                                    }}
                                    value={externalLinks[index]}
                                    onChangeText={text => {
                                        externalLinks[index]=text
                                        setExternalLinks([...externalLinks]);
                                    }}
                                />
                                <TextInput
                                    placeholder='입력해 주세요.'
                                    style={{
                                        borderRadius: 4, 
                                        borderColor: '#9C9C9C',
                                        borderWidth: 1,
                                        padding: 12,
                                        height: 50
                                    }}
                                    value={externalLinkTitles[index]}
                                    onChangeText={text => {
                                        externalLinkTitles[index] = text
                                        setExternalLinkTitles([...externalLinkTitles]);
                                    }}
                                />
                            </View>))
                        }
                    </View>
                </ScrollView>
                {
                    !!showingFinishButton &&
                    <RoundButton
                        text='확인'
                        onPress={onAddCommentToIdea}
                        loading={processing}
                    />
                }
            </SafeAreaView>
        </Modal>
    )
}

export default CommentRegistrationModal;