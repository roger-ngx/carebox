import React, { useEffect } from 'react';
import { StyleSheet, Image, ScrollView, SafeAreaView, Text, View } from 'react-native';
import PickedIdea from '../components/Idea/PickedIdea';
import Filter from '../components/Filter';

export default function Home() {
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
        <PickedIdea />
        <PickedIdea />
        <PickedIdea />
        <PickedIdea />
        <PickedIdea />
        <PickedIdea />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
