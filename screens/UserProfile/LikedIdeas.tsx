import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import PickedIdea from '../../components/Idea/PickedIdea';
import TitleNavigationBar from '../../components/TitleNavigationBar';
import { getLikedIdeas } from '../../firebase/UserRepository';

const LikedIdeas = ({navigation}) => {

    const [ideas, setIdeas] = useState([]);

    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        user && getIdeas(user.uid);
    }, [user]);

    const getIdeas = async (uid) => {
        if(uid){
            const ret = await getLikedIdeas(uid);
            setIdeas(ret || []);
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center'}}>
                <TitleNavigationBar
                    title='찜 목록'
                    containerStyle={{paddingVertical: 8}}
                    onBackPress={() => navigation.pop()}
                />
            </View>
            <Divider />

            <FlatList
                data={ideas}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={{marginBottom: 20}}
                        onPress={() => navigation.navigate('Idea', {ideaId: item.id})}
                    >
                        <PickedIdea idea={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                style={{padding: 20}}
                ListFooterComponent={() => <View style={{height: 100}} />}
            />
        </SafeAreaView>
    )
}

export default LikedIdeas;