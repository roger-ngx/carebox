import React from 'react';
import { View, Text } from 'react-native';

const FilterItem = ({text, active}) => {

    return (
        <View
            style={{
                width: '100%',
                alignSelf: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text
                style={{
                    color: active ? '#1379FF' : '#334F74',
                    fontSize: 16,
                    fontWeight: active ? 'bold' : 'normal',
                }}
            >
                {text}
            </Text>
            {
                active &&
                <View
                    style={{
                        width: 6, height: 6,
                        borderRadius: 3,
                        backgroundColor: '#1379FF',
                        marginTop: 4
                    }}
                />
            }
        </View>
    )
}

export default FilterItem;