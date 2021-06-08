import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';

import IdeaBody from './IdeaBody';
import Profile from '../Profile';

const PickedIdea = () => {

    return (
        <View
            style={{width: '100%', borderRadius: 10, backgroundColor: 'white', padding: 20}}
        >
            <Profile />
            <Divider style={{marginVertical: 16}}/>
            <IdeaBody />
        </View>
    )
}

export default PickedIdea;