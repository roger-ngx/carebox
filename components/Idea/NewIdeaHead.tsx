import React from 'react';
import { View, Text, Image } from 'react-native';

const NewIdeaHead = ({idea}) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Image source={require('assets/icons/person.png')} />
            <Text style={{fontSize: 16, marginHorizontal: 8, fontWeight: '500'}}>아이디어 뱅크</Text>
            <Text>2년차 ∙ 병동</Text>
        </View>
    )
}

export default NewIdeaHead;