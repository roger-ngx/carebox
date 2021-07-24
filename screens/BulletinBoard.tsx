import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BulletinBoard = () => {

    return (<SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Coming soon !</Text>
        </View>
    </SafeAreaView>)
}

export default BulletinBoard;