import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const ExternalLinkUpload = ({onLinkChanged}) => {

    const [ url, setUrl ] = useState();
    const [ title, setTile ] = useState();

    useEffect(() => {
        onLinkChanged({url, title})
    }, [url, title]);

    return (
        <View>
            <TextInput
                placeholder='링크를 입력해주세요.'
                style={styles.textInput}
                maxLength={50}
                value={url}
                onChangeText={setUrl}
            />
            <TextInput
                placeholder='설명 추가'
                style={styles.textInput}
                maxLength={50}
                value={title}
                onChangeText={setTile}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: '#9C9C9C',
        borderRadius: 4,
        padding: 16,
        fontSize: 16,
        backgroundColor: 'white'
    }
});

export default ExternalLinkUpload;