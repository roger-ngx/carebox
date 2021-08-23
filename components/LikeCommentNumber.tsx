import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { throttle } from 'lodash';

const LikeCommentNumber = ({liked, likeNumber=0, commentNumber=0, onLikeComment}) => {

    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={onLikeComment&&throttle(onLikeComment, 1000, {trailing: false})}
                disabled={typeof onLikeComment !== 'function'}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name={liked ? 'favorite' : 'favorite-border'} color={liked?'#EB1616':'#9F9F9F'}/>
                    <Text style={{color: '#434A3F', marginLeft: 2}}>{likeNumber}</Text>
                </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 12}}>
                <Icon name='chat-bubble-outline' color='#9F9F9F'/>
                <Text style={{color: '#434A3F', marginLeft: 2}}>{commentNumber}</Text>
            </View>
        </View>
    )
}

export default LikeCommentNumber;