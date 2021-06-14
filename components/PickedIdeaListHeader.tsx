import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const PickedIdeaListHeader = ({onPress, containerStyle}) => {

    return (
        <TouchableOpacity   
            style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8
                }, containerStyle
            ]}
            onPress={onPress}
        >
            <Image source={require('assets/icons/verified_black.png')} />
            <Text style={{flex: 1, fontSize: 24, color: '#1D395F', marginLeft: 8}}>Pick Idea</Text>
            <Icon
                name='arrow-forward-ios'
                color='#9AB6DC'
            />
        </TouchableOpacity>
    )
}

export default PickedIdeaListHeader;