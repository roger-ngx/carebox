import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TitleNavigationBar from '../../components/TitleNavigationBar';
import { getRegisteredBulletinItems } from '../../firebase/BulletinRepository';
import BulletinBoardItem from '../../components/BulletinBoardItem';

const RegisteredBulletinItems = ({navigation}) => {

    const [items, setitems] = useState([]);

    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        user && getBulletinItems(user.uid);
    }, [user]);

    const getBulletinItems = async (uid) => {
        if(uid){
            const ret = await getRegisteredBulletinItems(uid);
            setitems(ret || []);
        }
    }

    return (
        <SafeAreaView>
            <View style={{backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center'}}>
                <TitleNavigationBar
                    title='내가 등록한 아이디어'
                    containerStyle={{paddingVertical: 8}}
                    onBackPress={() => navigation.pop()}
                />
            </View>

            <FlatList
                    style={{width: '100%'}}
                    data={items}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('BulletinItemDetail', { item })}
                            style={{marginTop: 20, marginHorizontal: 20}}
                        >
                            <BulletinBoardItem item={item}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={{height: 100}} />}
                />
        </SafeAreaView>
    )
}

export default RegisteredBulletinItems;