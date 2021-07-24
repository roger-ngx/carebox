import React from 'react';
import { View, Text } from 'react-native';

const ExternalLink = ({title, link}) => {

    return (
        <View style={{marginBottom: 8, flexDirection: 'column'}}>
            <Text style={{color: '#2E2E2E', fontSize: 15}} numberOfLines={1}>&#8226; {link}</Text>
            <Text style={{color: '#334F74', fontSize: 16, marginTop: 4, marginLeft: 10}}>{title}</Text>
        </View>
    )
}

export default ExternalLink;