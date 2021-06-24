import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import RoundButton from './RoundButton';

const IdeaCommentButtons = ({onCommentRegister, onFavorite}) => {

    return (
        <View style={{width: '80%', flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                style={{marginRight: 16}}
                onPress={onFavorite}
            >
                <Icon name='favorite-border' color='#A1A99E' size={48}/>
            </TouchableOpacity>
            <View style={{flex: 1}}>
                <RoundButton
                    text='코멘트 남기기'
                    onPress={onCommentRegister}
                />
            </View>
        </View>
    )
}

export default IdeaCommentButtons;