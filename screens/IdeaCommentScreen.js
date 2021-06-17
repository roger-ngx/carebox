import React from 'react';
import { View, Image } from 'react-native';
import IdeaOverallRating from '../components/IdeaOverallRating';
import NewIdeaHead from '../components/Idea/NewIdeaHead';
import OutlinedTag from '../components/OutlinedTag';
import ExpandableText from '../components/ExpandableText';

const IdeaCommentScreen = () => {

    return (
        <View>
            <IdeaOverallRating />
            <NewIdeaHead />
            <OutlinedTag
                sign='P'
                text='용도의 전환'
                style={{alignSelf: 'flex-start'}}
            />
            <ExpandableText text='산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격'/>
            <Image style={{height: 150, marginBottom: 8}} source={{uri: 'https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg'}} />
        </View>
    )
}

export default IdeaCommentScreen;