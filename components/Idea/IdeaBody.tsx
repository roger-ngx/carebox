import React from 'react';
import { View, Text } from 'react-native';
import ContainedTag from '../ContainedTag';
import OutlinedTag from '../OutlinedTag';
import IdeaRate from './IdeaRate';
import IdeaHeart from './IdeaHeart';

const IdeaBody = () => {

    return (
        <>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
                <ContainedTag text='기계'/>
                <OutlinedTag text='용도의 전환' sign='P'/>
                <OutlinedTag text='역발상' sign='R'/>
            </View>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
                병동에서 쓰는 산소마스크 아이디어 입니다.
            </Text>
            <IdeaRate count={123} rate={4.5} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8
                }}
            >
                <Text style={{color: '#898989'}}>2021.04.06</Text>
                <IdeaHeart count={13}/>
            </View>

        </>
    )
}

export default IdeaBody;