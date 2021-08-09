import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import PickedIdea from '../../components/Idea/PickedIdea';
import TitleNavigationBar from '../../components/TitleNavigationBar';
import { getRegisteredIdeas } from '../../firebase/UserRepository';

const RegisterdIdeas = ({navigation}) => {

    const [ideas, setIdeas] = useState([]);

    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        user && getIdeas(user.uid);
    }, [user]);

    const getIdeas = async (uid) => {
        if(uid){
            const ret = await getRegisteredIdeas(uid);
            setIdeas(ret || []);
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center'}}>
                <TitleNavigationBar
                    title='내가 등록한 아이디어'
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
                        onPress={() => navigation.push('Idea', {idea: item})}
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

export default RegisterdIdeas;