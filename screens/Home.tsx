import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';

import PickedIdeaListHeader from 'components/PickedIdeaListHeader';
import Filter from 'components/Filter';
import PickedIdea from 'components/Idea/PickedIdea';
import NewIdea from 'components/Idea/NewIdea';
import IdeaRegistrationModal from 'modals/IdeaRegistrationModal';
import { addIdeasListenner } from 'firebase/IdeaRepository';

export default function Home({navigation}) {

  const ideas = useSelector(state => state.user.ideas);
  const dispatch = useDispatch();
  console.log('ideas', ideas);

  const [ openRegistrationModal, setOpenRegistrationModal ] = useState(false);

  const openModal = () => setOpenRegistrationModal(true)
  const closeModal = () => setOpenRegistrationModal(false)

  useEffect(() => {
    const unsubscriber = addIdeasListenner(dispatch);

    return () => (typeof unsubscriber === 'function') && unsubscriber();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={{marginBottom: 16, alignSelf: 'center'}} source={require('assets/images/carebox.png')} />
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
            alignItems: 'center',
          }}
        >
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            간호 혁신 아이디어에 도전하세요!
          </Text>
        </View>
        <View style={{backgroundColor: 'white', padding: 20}}>
          <Filter current='전체'/>
        </View>
        <View style={{paddingHorizontal: 20, marginBottom: 80}}>
          <PickedIdeaListHeader
            containerStyle={{paddingVertical: 20}}
            onPress={() => navigation.navigate('PickedIdeas')}
          />
          <PickedIdea />

          <Divider style={{marginVertical: 20, color: '#B7BCC9'}} />
          <View>
            <Text style={{fontSize: 24, color: '#1D395F', marginBottom: 20}}>New Idea</Text>

            {
              map(ideas, idea => (
                <TouchableOpacity
                  style={{marginBottom: 20}}
                  onPress={() => navigation.navigate('Idea', {idea})}
                >
                  <NewIdea key={idea.id} idea={idea} containerStyle={{marginBottom: 20}}/>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#1379FF',
            paddingVertical: 20,
            paddingHorizontal: 32,
            borderRadius: 32
          }}
          onPress={openModal}
        >
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>아이디어 등록하기</Text>
        </TouchableOpacity>
      </View>
      {
        openRegistrationModal &&
        <IdeaRegistrationModal onClose={closeModal}/>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
