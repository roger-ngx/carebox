import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Icon } from 'react-native-elements';
import { map, filter, size } from 'lodash';

import RoundButton from '../components/RoundButton';
import BulletinRegistrationModal from '../modals/BulletinRegistrationModal';
import { addBulletinBoardsListenner } from '../firebase/BulletinRepository';
import BulletinBoardItem from '../components/BulletinBoardItem';
import BulletinItemDetailModal from '../modals/BulletinItemDetailModal';
import FilterItem from '../components/FilterItem';

const FILTERS = [ '전체', '일상', '업무' ];

const BulletinBoard = ({navigation}) => {
    const [ openRegistrationModal, setOpenRegistrationModal ] = useState(false);
    const [ openBulletinItemDetail, setOpenBulletinItemDetail ] = useState(false);
    const [ currentItem, setCurrentItem ] = useState();
    const [ currentFilter, setCurrentFilter ] = useState('전체');
    const [ currentBoards, setCurrentBoards ] = useState();

    const dispatch = useDispatch();
    const boards = useSelector(state => state.bulletinBoard.items);

    useEffect(() => {
        const unsbscriber = addBulletinBoardsListenner(dispatch);
        return () => {
            (typeof unsbscriber === 'function') && unsbscriber();
        }
    }, [])

    useEffect(() => {
        switch(currentFilter){
            case '전체':
                setCurrentBoards(boards);
                break;
            case '일상':
                setCurrentBoards(filter(boards, board => board.type==='일상'));
                break;
            case '업무':
                setCurrentBoards(filter(boards, board => board.type==='업무'));
                break;
        }
    }, [currentFilter, boards]);


    return (<SafeAreaView edges={['top']} style={{backgroundColor: '#EFF4F5', flex: 1}}>
        <View
            style={{
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
        {
            size(currentBoards) > 0 ?
            <>
                <View style={{backgroundColor: 'white', flexDirection: 'row'}}>
                    {
                        map(FILTERS, filter => (
                                <TouchableOpacity
                                    style={{flex: 1, paddingVertical: 12}}
                                    onPress={() => setCurrentFilter(filter)}
                                >
                                    <FilterItem text={filter} active={currentFilter===filter} />
                                </TouchableOpacity>
                            )
                        )
                    }
                </View>
                <Divider />
            </>
            :
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{fontSize: 16, color: '#334F74'}}>
                    등록된 게시글이 없습니다.
                </Text>
            </View>
        }

        <View style={{flex: 1, width: '100%', paddingHorizontal: 20}}>
            <FlatList
                style={{width: '100%', paddingTop: 20}}
                data={currentBoards}
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
        <View style={{position: 'absolute', bottom: 20, right: 20}}>
            <TouchableOpacity
                style={{
                    width: 60, height: 60, borderRadius: 60,
                    backgroundColor: '#1379FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.25,
                    elevation: 1
                }}
                onPress={() => setOpenRegistrationModal(true)}
            >
                <Icon name='edit' color='white'/>
            </TouchableOpacity>
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