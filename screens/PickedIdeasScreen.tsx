import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, View } from 'react-native';
import { size, filter } from 'lodash';
import { Divider, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import PickedIdea from '../components/Idea/PickedIdea';
import Filter from '../components/Filter';
import { setLoadingToken } from '../stores/slices/tokenSlice';
import { loadIdeaByIds } from '../firebase/IdeaRepository';
import { ActivityIndicator } from 'react-native-paper';

export default function PickedIdeasScreen({navigation, route}) {
    const [ currentFilter, setCurrentFilter ] = useState('전체');
    const [ pickedIdeas, setPickedIdeas ] = useState([]);

    const [ filteredIdeas, setFilteredIdeas ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    const { ids } = route.params;

    useEffect(() => {
        if(size(ids) > 0){
            loadIdeas(ids);
        }
    }, [ids]);

    const loadIdeas = async (ids) => {
        setLoading(true);

        setPickedIdeas(await loadIdeaByIds(ids));

        setLoading(false);
    }

    useEffect(() => {
        if(!currentFilter) return;
    
        console.log('currentFilter', currentFilter);
    
        if(currentFilter === '전체'){
            setFilteredIdeas(pickedIdeas);
        } else {
            setFilteredIdeas(filter(pickedIdeas, idea => idea.category === currentFilter));
        }
    
      }, [currentFilter, pickedIdeas]);

    return (
    <SafeAreaView edges={['top']} style={styles.container}>
        <View
            style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 20}}
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
                <Image style={{width: 24, height: 24}} source={require('assets/icons/verified_black.png')} />
                <Text style={{fontSize: 24, color: '#1D395F', marginLeft: 8}}>Pick Idea</Text>
            </View>
        </View>
        <Divider style={{backgroundColor: '#DCDCDC', height: 2}}/>

        <View style={{backgroundColor: 'white', padding: 20, marginBottom: 20}}>
          <Filter value={currentFilter} setValue={setCurrentFilter}/>
        </View>

        {
            loading ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color='#1379FF' />
            </View>
            :
            <View style={{flex: 1, width: '100%', paddingHorizontal: 20}}>

                <FlatList
                    data={filteredIdeas}
                    keyExtractor={item => item.id}
                    renderItem={
                        ({item}) => (
                        <TouchableOpacity
                            style={{marginBottom: 20}}
                            onPress={() => navigation.navigate('Idea', {idea: item})}
                        >
                            <PickedIdea idea={item} containerStyle={{marginBottom: 20}}/>
                        </TouchableOpacity>
                        )
                    }
                    ListEmptyComponent={() => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
                        <Text style={{textAlign: 'center', color: '#334F74', fontSize: 16}}>{`등록된 아이디어가 없습니다.\n지금 아이디어를 등록해보세요!`}</Text>
                    </View>}
                />
            </View>
        }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
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
