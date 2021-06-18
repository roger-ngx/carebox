import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import IdeaOverallRating from '../components/IdeaOverallRating';
import NewIdeaHead from '../components/Idea/NewIdeaHead';
import OutlinedTag from '../components/OutlinedTag';
import ExpandableText from '../components/ExpandableText';
import RatingView from '../components/RatingView';
import LikeCommentNumber from 'components/LikeCommentNumber';
import { Divider } from 'react-native-elements';
import CommentInputModal from '../modals/CommentInputModal';

const Comment = () => (
    <View>
        <View style={{marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#434A3F', marginBottom: 8}}>종합평점 <Text style={{fontWeight: 'bold', fontSize: 16, color: '#1379FF'}}>2.8점</Text></Text>
            <RatingView />
        </View>
        <View style={{marginBottom: 10}}>
            <OutlinedTag
                sign='P'
                text='용도의 전환'
                style={{alignSelf: 'flex-start'}}
            />
        </View>
        <View style={{marginBottom: 10}}>
            <ExpandableText text='산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격'/>
        </View>
        <Image style={{height: 150, marginBottom: 20}} source={{uri: 'https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg'}} />
        
        <View style={{marginBottom: 32}}>
            <View style={{marginBottom: 8}}>
                <Text style={{color: '#334F74', fontSize: 16}}>1회용 필터 정보</Text>
                <Text style={{color: '#2E2E2E'}} numberOfLines={1}>https://www.figma.com/file/zFayXRmFx4XDXxIvdh7jq3/%EC%BC%80%EC%96%B4%EB%B0%95%EC%8A%A4?node-id=315%3A654</Text>
            </View>
            <View>
                <Text style={{color: '#334F74', fontSize: 16}}>1회용 필터 정보</Text>
                <Text style={{color: '#2E2E2E'}} numberOfLines={1}>https://www.figma.com/file/zFayXRmFx4XDXxIvdh7jq3/%EC%BC%80%EC%96%B4%EB%B0%95%EC%8A%A4?node-id=315%3A654</Text>
            </View>
        </View>

        <View>
            <LikeCommentNumber liked={true}/>
        </View>
        
        <Divider/>

        <TouchableOpacity style={{paddingVertical: 10}}>
            <Text style={{fontSize: 10, color: '#898989'}}>댓글 20개 모두 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: 'white',
                paddingVertical: 16,
                alignItems: 'center'
            }}
            onPress={() => setShowCommentInputModal(true)}
        >
            <Image source={require('assets/icons/person.png')} />
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
)

const IdeaCommentScreen = () => {
    const [ showCommentInputModal, setShowCommentInputModal ] = useState(false);

    return (
        <ScrollView>
            <IdeaOverallRating />
            <View style={{padding: 20}}>
                <View style={{paddingBottom: 20}}>
                    <NewIdeaHead />
                </View>

                <Comment />
            </View>
            {
                showCommentInputModal &&
                <CommentInputModal onClose={() => setShowCommentInputModal(false)}/>
            }
        </ScrollView>
    )
}

export default IdeaCommentScreen;