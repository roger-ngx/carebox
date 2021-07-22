import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, FlatList, Text, View } from 'react-native';
import { size } from 'lodash';
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
                <Image source={require('assets/icons/verified_black.png')} />
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
                <ActivityIndicator size='large' color='blue' />
            </View>
            :
            <View style={{flex: 1}}>

                <FlatList
                    data={pickedIdeas}
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
                    // contentContainerStyle={{flex: 1}}
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
