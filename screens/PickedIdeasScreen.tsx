import React, { useEffect } from 'react';
import { StyleSheet, Image, ScrollView, Text, View } from 'react-native';
import PickedIdea from '../components/Idea/PickedIdea';
import Filter from '../components/Filter';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PickedIdeasScreen({navigation}) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
        <View
            style={{flexDirection: 'row', alignItems: 'center'}}
        >
            <TouchableOpacity
                onPress={() => navigation.pop()}
            >
                <Icon
                    name='arrow-back-ios'
                    color='black'
                />
            </TouchableOpacity>
            <View style={{flex: 1, zIndex: -1, marginLeft: -24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('assets/icons/verified_black.png')} />
                <Text style={{fontSize: 24, color: '#1D395F', marginLeft: 8}}>Pick Idea</Text>
            </View>
        </View>

        <Filter current='전체' containerStyle={{paddingVertical: 20, width: '100%'}}/>

        <ScrollView
            style={{width: '100%', backgroundColor: '#EFF4F5'}}
            showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => navigation.navigate('IdeaDetail')}
            >
                <PickedIdea />
            </TouchableOpacity>
            <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => navigation.navigate('IdeaDetail')}
            >
                <PickedIdea />
            </TouchableOpacity>
            <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => navigation.navigate('IdeaDetail')}
            >
                <PickedIdea />
            </TouchableOpacity>
            <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => navigation.navigate('IdeaDetail')}
            >
                <PickedIdea />
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
