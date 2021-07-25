import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { map } from 'lodash';

import RoundButton from '../components/RoundButton';
import BulletinRegistrationModal from '../modals/BulletinRegistrationModal';
import { addBulletinBoardsListenner } from '../firebase/BulletinRepository';
import ExpandableText from '../components/ExpandableText';
import LikeCommentNumber from '../components/LikeCommentNumber';
import TitleNavigationBar from '../components/TitleNavigationBar';
import BulletinBoardItem from '../components/BulletinBoardItem';

const BulletinBoard = ({navigation}) => {
    const [ openRegistrationModal, setOpenRegistrationModal ] = useState(false);

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
            <View style={{flex: 1, width: '100%', padding: 20}}>
                <FlatList
                    style={{width: '100%'}}
                    data={boards}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('BulletinItemDetail', { item })}
                        >
                            <BulletinBoardItem item={item}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{position: 'absolute', bottom: 20, width: '60%'}}>
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
    </SafeAreaView>)
}

export default BulletinBoard;