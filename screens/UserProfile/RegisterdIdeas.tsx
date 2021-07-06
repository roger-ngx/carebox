import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
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
        <SafeAreaView>
            <View style={{backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center'}}>
                <TitleNavigationBar
                    title='찜 목록'
                    containerStyle={{paddingVertical: 8}}
                    onBackPress={() => navigation.pop()}
                />
            </View>

            <FlatList
                data={ideas}
                renderItem={({item}) => (<PickedIdea idea={item} />)}
                keyExtractor={item => item.id}
                style={{padding: 20}}
            />
        </SafeAreaView>
    )
}

export default RegisterdIdeas;