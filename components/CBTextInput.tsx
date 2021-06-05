import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { size } from 'lodash';

const CBTextInput = ({title, value, setValue, height=50, maxLength, placeholder, multiline=false}) => {

    return (
        <View>
            <Text style={{fontSize: 16, color: '#334F74', fontWeight: 'bold', marginBottom: 8}}>{title}</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                multiline={multiline}
                height={height}
                maxLength={maxLength}
                style={{borderWidth: 1, borderColor: '#334F74', borderRadius: 4, padding: 12}}
            />
            <Text style={{textAlign: 'right', marginTop: 4, fontSize: 12}}>{size(value)}/{maxLength}</Text>
        </View>
    )
}

export default CBTextInput;