import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { split } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import RatingView from '../components/RatingView';
import OutlinedTag from '../components/OutlinedTag';
import ExpandableText from '../components/ExpandableText';
import LikeCommentNumber from '../components/LikeCommentNumber';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import TitleNavigationBar from '../components/TitleNavigationBar';

const CommentListModal = ({parentComment, isVisible, onClose}) => {

    if(!parentComment) return null;

    const {
        ideaId, practicalityRate, creativityRate, valuableRate,
        scamper, content
    } = parentComment;

    const scamperSplits = split(scamper, ' : ');

    return (
        <Modal
            isVisible={isVisible}
            style={{margin: 0}}
            hasBackdrop={false}
            onBackButtonPress={onClose}
            animationIn='slideInRight'
            animationOut='slideOutLeft'
            useNativeDriver={true}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
                <View style={{}}>
                    <TitleNavigationBar
                        title='댓글'
                        onBackPress={onClose}
                    />
                </View>
                <ScrollView>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#434A3F', marginBottom: 8}}>종합평점 <Text style={{fontWeight: 'bold', fontSize: 16, color: '#1379FF'}}>2.8점</Text></Text>
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
                    <View style={{marginBottom: 10}}>
                        <LikeCommentNumber liked={true}/>
                    </View>
                    <Divider />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default CommentListModal;