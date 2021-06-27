import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';

import IdeaBody from './IdeaBody';
import Profile from '../Profile';

const PickedIdea = ({idea}) => {

    if(!idea) return null;

    return (
        <View
            style={{width: '100%', borderRadius: 10, backgroundColor: 'white', padding: 20}}
        >
            <Profile user={idea.owner}/>
            <Divider style={{marginVertical: 16}}/>
            <IdeaBody idea={idea}/>
        </View>
    )
}

export default PickedIdea;