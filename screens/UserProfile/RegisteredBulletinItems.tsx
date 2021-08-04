import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Animated, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { remove } from 'lodash';

import TitleNavigationBar from '../../components/TitleNavigationBar';
import { getRegisteredBulletinItems, deleteBulletinItemById } from '../../firebase/BulletinRepository';
import BulletinBoardItem from '../../components/BulletinBoardItem';
import BulletinItemDetailModel from '../../modals/BulletinItemDetailModal';

const RegisteredBulletinItems = ({navigation}) => {

    const [items, setItems] = useState([]);
    const [ openBulletinItemDetail, setOpenBulletinItemDetail ] = useState(false);
    const [ currentItem, setCurrentItem ] = useState();

    const [ selectedItemToDelete, setSelectedItemToDelete ] = useState();
    const [ openToast, setOpenToast ] = useState(false);
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const [ toastContent, setToastContent ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        user && getBulletinItems(user.uid);
    }, [user]);

    const getBulletinItems = async (uid) => {
        if(uid){
            const ret = await getRegisteredBulletinItems(uid);
            setItems(ret || []);
        }
    }

    const openItemDetail = (item) => {
        setCurrentItem(item);
        setOpenBulletinItemDetail(true);
    }

    const onDeletePost = async (post) => {
        if(selectedItemToDelete === post.id){
            setLoading(true);
            const ret = await deleteBulletinItemById(post.id);
            setLoading(false);

            if(ret){
                remove(items, item => item.id === post.id);
                setItems([...items]);
            }else{
                setToastContent(`Something's wrong. Please try again`);
                setOpenToast(true);
            }
        }else{
            setToastContent('Press one more time to delete');
            setSelectedItemToDelete(post.id);
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
                    title='내가 쓴 게시글'
                    containerStyle={{paddingVertical: 8}}
                    onBackPress={() => navigation.pop()}
                />
            </View>

            <FlatList
                style={{width: '100%'}}
                data={items}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => openItemDetail(item)}
                        style={{marginTop: 20, marginHorizontal: 20}}
                    >
                        <BulletinBoardItem item={item}/>
                        <TouchableOpacity
                            style={{position: 'absolute', bottom: 0, right: 0, paddingVertical: 20, paddingHorizontal: 20}}
                            onPress={() => onDeletePost(item)}
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
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{height: 100}} />}
            />
            {
                openBulletinItemDetail &&
                <BulletinItemDetailModel
                    isVisible={openBulletinItemDetail}
                    item={currentItem}
                    onClose={() => setOpenBulletinItemDetail(false)}
                />
            }
            {
                openToast &&
                <Animated.View
                    style={{
                        opacity: opacityAnim,
                        position: 'absolute',
                        bottom: 0, right: 0, left: 0,
                        backgroundColor: '#333',
                        paddingVertical: 8
                    }}
                >
                    <Text style={{textAlign: 'center', color: 'white'}}>{toastContent}</Text>
                </Animated.View>
            }
        </SafeAreaView>
    )
}

export default RegisteredBulletinItems;