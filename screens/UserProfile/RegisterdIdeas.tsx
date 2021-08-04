import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Text, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { remove } from 'lodash';
import { Icon } from 'react-native-elements';

import TitleNavigationBar from '../../components/TitleNavigationBar';
import { getRegisteredIdeas } from '../../firebase/UserRepository';
import NewIdea from '../../components/Idea/NewIdea';
import { deleteIdeaById } from '../../firebase/IdeaRepository';

const RegisterdIdeas = ({navigation}) => {

    const [ideas, setIdeas] = useState([]);
    const [ selectedItemToDelete, setSelectedItemToDelete ] = useState();
    const [ openToast, setOpenToast ] = useState(false);
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const [ toastContent, setToastContent ] = useState('');
    const [ loading, setLoading ] = useState(false);

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

    const onDeleteIdea = async (item) => {
        if(selectedItemToDelete === item.id){
            setLoading(true);
            const ret = await deleteIdeaById(item.id);
            setLoading(false);

            if(ret){
                remove(ideas, idea => idea.id === item.id);
                setIdeas([...ideas]);
            }else{
                setToastContent(`Something's wrong. Please try again`);
                setOpenToast(true);
            }
        }else{
            setToastContent('Press one more time to delete');
            setSelectedItemToDelete(item.id);
            setOpenToast(true);
        }
    }

    useEffect(() => {
        if(openToast){
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                delay: 2000
            }).start(() => setOpenToast(false));
        }
    }, [openToast]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center'}}>
                <TitleNavigationBar
                    title='내가 등록한 아이디어'
                    containerStyle={{paddingVertical: 8}}
                    onBackPress={() => navigation.pop()}
                />
            </View>

            <FlatList
                data={ideas}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={{marginBottom: 20}}
                        onPress={() => navigation.push('Idea', {idea: item})}
                    >
                        <NewIdea idea={item} />
                        <TouchableOpacity
                            style={{position: 'absolute', top: 0, right: 0, paddingVertical: 24, paddingHorizontal: 20}}
                            onPress={() => onDeleteIdea(item)}
                            disabled={loading}
                        >
                            {
                                loading ?
                                <ActivityIndicator size='small' color='#787878' />
                                :
                                <Icon name='delete' color={selectedItemToDelete === item.id ? '#1379FF' : '#787878'} />
                            }
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                style={{padding: 20}}
            />
            {
                openToast &&
                <Animated.View style={{opacity: opacityAnim, position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: '#333', paddingVertical: 8}}>
                    <Text style={{textAlign: 'center', color: 'white'}}>{toastContent}</Text>
                </Animated.View>
            }
        </SafeAreaView>
    )
}

export default RegisterdIdeas;