import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const RoundButton = ({text, onPress, loading, ...props}) => {

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#4A7CFF',
                paddingVertical: 16,
                borderRadius: 50,
                width: '100%',
                alignSelf: 'flex-end'
            }}
            onPress={onPress}
            {...props}
        >
            {
                loading ?
                <ActivityIndicator
                    size='small'
                    color='white'
                />
                :
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>
                    {text}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default RoundButton;