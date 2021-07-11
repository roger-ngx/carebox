import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import IdeaDetailScreen from './IdeaDetailScreen';
import { Icon } from 'react-native-elements';
import IdeaCommentScreen from './IdeaCommentScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setIdeaId } from '../stores/slices/ideaSlice';
import PickedList from './PickedList';
import { addIdeaListenner, loadIdeaFromId } from '../firebase/IdeaRepository';
import { ActivityIndicator } from 'react-native-paper';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#1379FF'}}
    style={{backgroundColor: 'white'}}
    activeColor='#1379FF'
    inactiveColor='#334F74'
    labelStyle={{fontSize: 16}}
  />
)

export default function IdeaScreen({route, navigation}) {
  const { ideaId, idea } = route.params;
  if(!idea && !ideaId){
    return null;
  };

  const [ loading, setLoading ] = useState(true);
  const [ ideaData, setIdeaData ] = useState(idea || {});

  const layout = useWindowDimensions();


  const loadIdea = async (ideaId) => {
    try{
      setIdeaData(await loadIdeaFromId(ideaId));
    }catch(ex){
      console.log('loadIdea', ex)
    }
    setLoading(false);
  }

  useEffect(() => {
    if(ideaId){
      loadIdea(ideaId);
    }
  }, [ideaId])

  const dispatch = useDispatch();

  dispatch(setIdeaId(ideaData.id))

  useEffect(() => {
    if(ideaData.id){
        setLoading(false);

        const unsubscriber = addIdeaListenner(ideaData.id, dispatch);

        return () => (typeof unsubscriber === 'function') && unsubscriber();
    }
  }, [ideaData.id])

  const currentIdea = useSelector(state => state.idea.currentIdea);

  const renderScene = SceneMap({
    first: () => (<IdeaDetailScreen idea={currentIdea} />),
    second: () => (<IdeaCommentScreen idea={ideaData} />),
    third: () => (<PickedList pickes={currentIdea && currentIdea.pickes} />)
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '아이디어 상세' },
    { key: 'second', title: '코멘트' },
    { key: 'third', title: 'PICK' },
  ]);

  return (
    <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: 'white'}}>
      {
        loading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='small' color='#1379FF' />
        </View>
        :
        <>
          <View
              style={{
                  paddingHorizontal: 20,
                  paddingBottom: 12,
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center'
              }}
          >
              <TouchableOpacity
                style={{paddingTop: 8}}
                onPress={() => navigation.navigate('Home')}
              >
                  <Icon
                      name='arrow-back-ios'
                      color='black'
                  />
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingTop: 8}}
                onPress={() => navigation.navigate('Notification')}
              >
                  <Icon
                      name='notifications-none'
                      color='black'
                  />
              </TouchableOpacity>
          </View>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </>
      }
    </SafeAreaView>
  );
}
