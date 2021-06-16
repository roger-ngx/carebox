import React from 'react';
import { View } from 'react-native';
import IdeaOverallRating from '../components/IdeaOverallRating';
import NewIdeaHead from '../components/Idea/NewIdeaHead';
import OutlinedTag from '../components/OutlinedTag';

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
        </View>
    )
}

export default IdeaCommentScreen;