import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { isEmpty } from 'lodash';

import IdeaBody from './IdeaBody';
import Profile from '../Profile';

const PickedIdea = ({idea, containerStyle}) => {

    if(isEmpty(idea)) return null;

    return (
        <View
            style={[{width: '100%', borderRadius: 10, backgroundColor: 'white', padding: 20}, containerStyle]}
        >
            <Profile user={idea.owner}/>
            <Divider style={{marginVertical: 16}}/>
            <IdeaBody idea={idea}/>
        </View>
    )
}

export default PickedIdea;