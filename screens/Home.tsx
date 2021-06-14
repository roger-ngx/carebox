import React, { useEffect } from 'react';
import { StyleSheet, Image, ScrollView, SafeAreaView, Text, View } from 'react-native';
import PickedIdea from '../components/Idea/PickedIdea';
import Filter from '../components/Filter';
import PickedIdeaListHeader from '../components/PickedIdeaListHeader';
import { Divider } from 'react-native-paper';
import NewIdea from '../components/Idea/NewIdea';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={{marginBottom: 16}} source={require('assets/images/carebox.png')} />
      <ScrollView
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <View
          style={{
            backgroundColor: '#1379FF',
            height: 100, width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            간호 혁신 아이디어에 도전하세요!
          </Text>
        </View>
        <View style={{backgroundColor: 'white', padding: 20}}>
          <Filter current='전체'/>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <PickedIdeaListHeader
            containerStyle={{paddingVertical: 20}}
            onPress={() => navigation.navigate('PickedIdeas')}
          />
          <PickedIdea />

          <Divider style={{marginVertical: 20, color: '#B7BCC9'}} />
          <View>
            <Text style={{fontSize: 24, color: '#1D395F', marginBottom: 20}}>New Idea</Text>
            <NewIdea containerStyle={{marginBottom: 20}}/>
            <NewIdea containerStyle={{marginBottom: 20}}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF4F5'
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
