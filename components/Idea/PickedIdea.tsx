import React from 'react';
import { View } from 'react-native';
import PickedIdeaHead from './PickedIdeaHead';
import { Divider } from 'react-native-elements';
import IdeaBody from './IdeaBody';

const PickedIdea = () => {

    return (
        <View
            style={{width: '100%', borderRadius: 10, backgroundColor: 'white', padding: 20}}
        >
            <PickedIdeaHead />
            <Divider style={{marginVertical: 16}}/>
            <IdeaBody />
        </View>
    )
}

export default PickedIdea;