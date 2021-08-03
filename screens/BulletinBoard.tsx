import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';

import RoundButton from '../components/RoundButton';
import BulletinRegistrationModal from '../modals/BulletinRegistrationModal';
import { addBulletinBoardsListenner } from '../firebase/BulletinRepository';
import BulletinBoardItem from '../components/BulletinBoardItem';
import BulletinItemDetailModal from '../modals/BulletinItemDetailModal';

const BulletinBoard = ({navigation}) => {
    const [ openRegistrationModal, setOpenRegistrationModal ] = useState(false);
    const [ openBulletinItemDetail, setOpenBulletinItemDetail ] = useState(false);
    const [ currentItem, setCurrentItem ] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        const unsbscriber = addBulletinBoardsListenner(dispatch);
        return () => {
            (typeof unsbscriber === 'function') && unsbscriber();
        }
    }, [])

    const boards = useSelector(state => state.bulletinBoard.items);

    return (<SafeAreaView edges={['top']} style={{backgroundColor: '#EFF4F5', flex: 1, alignItems: 'center'}}>
            <View
                style={{
                    width: '100%',
                    backgroundColor: 'white',
                    paddingVertical: 20
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#334F74',
                        fontSize: 18
                    }}
                >
                    자유게시판
                </Text>
            </View>
            <Divider />
            <View style={{flex: 1, width: '100%', paddingHorizontal: 20, marginTop: 20}}>
                <FlatList
                    style={{width: '100%'}}
                    data={boards}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() =>{
                                setCurrentItem(item);
                                setOpenBulletinItemDetail(true);
                            }}
                            style={{marginBottom: 20}}
                        >
                            <BulletinBoardItem item={item}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={{height: 100}} />}
                />
            </View>
            <View style={{position: 'absolute', bottom: 10, width: '60%'}}>
                <RoundButton
                    text='등록하기'
                    onPress={() => setOpenRegistrationModal(true)}
                />
            </View>
        {
            openRegistrationModal &&
            <BulletinRegistrationModal
                onClose={() => setOpenRegistrationModal(false)}
            />
        }
        {
            openBulletinItemDetail &&
            <BulletinItemDetailModal
                isVisible={openBulletinItemDetail}
                item={currentItem}
                onClose={() => setOpenBulletinItemDetail(false)}
            />
    }
    </SafeAreaView>)
}

export default BulletinBoard;