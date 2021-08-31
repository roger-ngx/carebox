import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const TitleNavigationBar = ({onBackPress, title, containerStyle}) => {

    return (
        <View
            style={[{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
            }, containerStyle]}
        >
            <TouchableOpacity
                style={{padding: 8, paddingLeft: 0, zIndex: 1}}
                onPress={onBackPress}
            >
                <Icon
                    name='arrow-back-ios'
                    color='black'
                />
            </TouchableOpacity>
            <Text
                style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#334F74',
                    marginLeft: -40
                }}
            >
                {title}
            </Text>
        </View>
    )
}

export default TitleNavigationBar;