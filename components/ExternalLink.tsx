import React from 'react';
import { View, Text } from 'react-native';

const ExternalLink = ({title, link}) => {

    return (
        <View style={{marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: '#334F74', fontSize: 16, maxWidth: '40%'}} numberOfLines={1}>&#8226; {title}</Text>
            <Text style={{color: '#2E2E2E', maxWidth: '40%'}} numberOfLines={1}>{link}</Text>
        </View>
    )
}

export default ExternalLink;