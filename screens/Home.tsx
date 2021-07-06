import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, Text, View, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { map, get, filter } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';

import PickedIdeaListHeader from 'components/PickedIdeaListHeader';
import Filter from 'components/Filter';
import PickedIdea from 'components/Idea/PickedIdea';
import NewIdea from 'components/Idea/NewIdea';
import IdeaRegistrationModal from 'modals/IdeaRegistrationModal';
import { addIdeasListenner } from 'firebase/IdeaRepository';
import { requestPushNotificationPermission, subscribeForUserInformation } from '../firebase/UserRepository';

export default function Home({navigation}) {

  const currentUser = useSelector(state => state.user.currentUser);

  const storeIdeas = useSelector(state => state.user.ideas);
  const dispatch = useDispatch();

  const [ ideas, setIdeas ] = useState(storeIdeas);
  const [ currentFilter, setCurrentFilter ] = useState('전체');
  const [ openRegistrationModal, setOpenRegistrationModal ] = useState(false);

  const openModal = () => setOpenRegistrationModal(true)
  const closeModal = () => setOpenRegistrationModal(false)

  useEffect(() => {

    if(Platform.OS === 'ios'){
      requestPushNotificationPermission();
    }

    const unsubscriber = addIdeasListenner(dispatch);

    return () => (typeof unsubscriber === 'function') && unsubscriber();
  }, []);

  useEffect(() => {
    if(!currentFilter) return;

    console.log('currentFilter', currentFilter);

    if(currentFilter === '전체'){
      setIdeas(storeIdeas);
    } else {
      setIdeas(filter(storeIdeas, idea => idea.category === currentFilter));
    }

  }, [currentFilter, storeIdeas]);

  useEffect(() => {
    if(currentUser){
      const uid = currentUser.uid;
      if(uid){
        subscribeForUserInformation(uid, dispatch);
      }
    }
  }, [currentUser]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Image
        style={{marginVertical: 16, alignSelf: 'center'}}
        source={require('assets/images/carebox.png')}
      />
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
          <Filter value={currentFilter} setValue={setCurrentFilter}/>
        </View>
        <View style={{paddingHorizontal: 20, marginBottom: 80}}>
          <PickedIdeaListHeader
            containerStyle={{paddingVertical: 20}}
            onPress={() => navigation.navigate('PickedIdeas')}
          />
          <PickedIdea idea={get(ideas, '0')}/>

          <Divider style={{marginVertical: 20, color: '#B7BCC9'}} />
          <View>
            <Text style={{fontSize: 24, color: '#1D395F', marginBottom: 20}}>New Idea</Text>

            <FlatList
              data={ideas}
              keyExtractor={item => item.id}
              renderItem={
                ({item}) => (
                  <TouchableOpacity
                    style={{marginBottom: 20}}
                    onPress={() => navigation.navigate('Idea', {idea: item})}
                  >
                    <NewIdea key={item.id} idea={item} containerStyle={{marginBottom: 20}}/>
                  </TouchableOpacity>
                )
              }
            />
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
