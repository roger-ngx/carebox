import React, { useState } from 'react';
import { View, Text, Clipboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';

const ExternalLink = ({title, link}) => {

    const [ showSnackbar, setShowSnackbar ] = useState(false);

    const onPressLink = () => {
        setShowSnackbar(true);
        Clipboard.setString(link);
    }

    return (
        <View style={{marginBottom: 8, flexDirection: 'column'}}>
            <TouchableOpacity onPress={onPressLink}>
                <Text style={{color: '#2E2E2E', fontSize: 15}} numberOfLines={1}>&#8226; {link}</Text>
            </TouchableOpacity>
            <Text style={{color: '#334F74', fontSize: 16, marginTop: 4, marginLeft: 10}}>{title}</Text>
            <Snackbar
                visible={showSnackbar}
                wrapperStyle={{marginBottom: 100}}
                duration={1000}
                onDismiss={() => setShowSnackbar(false)}
            >
                <Text style={{textAlign: 'center', color: 'white'}}>
                    링크가 복사되었습니다
                </Text>
            </Snackbar>
        </View>
    )
}

export default ExternalLink;