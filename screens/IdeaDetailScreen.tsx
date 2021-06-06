import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import PickedIdea from '../components/Idea/PickedIdea';
import { Divider } from 'react-native-elements';

const IdeaDetailScreen = () => {

    return (
        <ScrollView style={{flex: 1, backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
            <PickedIdea />
            <Divider/>
            <View style={{padding: 20}}>
                <View style={{marginBottom: 8}}>
                    <Text style={{color: '#898989', marginBottom: 2}}>구체적 대상</Text>
                    <Text style={{color: '#334F74', fontSize: 16}}>산소 마스크</Text>
                </View>
                <View style={{marginBottom: 8}}>
                    <Text style={{color: '#898989', marginBottom: 2}}>구체적 상황</Text>
                    <Text style={{color: '#334F74', fontSize: 16}}>산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격 산소 마스크 사용할 때 위생관리가 잘 안되는 환자 목격</Text>
                </View>
                <View style={{marginBottom: 8}}>
                    <Text style={{color: '#898989', marginBottom: 2}}>해결방법</Text>
                    <Text style={{color: '#334F74', fontSize: 16}}>1회용 필터를 갈아 끼우는 형태로 제안합니다.</Text>
                </View>
            </View>
            <Divider />
            <View style={{padding: 20}}>
                <Text style={{color: '#7D7D7D', marginBottom: 8}}>이미지</Text>
                <Image style={{height: 150, marginBottom: 8}} source={{uri: 'https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg'}} />
                <Text  style={{color: '#334F74', fontSize: 16}}>이미지 설명 이미지 설명 이미지 설명</Text>
            </View>
            <Divider />
            <View style={{padding: 20}}>
                <Text style={{color: '#7D7D7D', marginBottom: 8}}>링크</Text>
                <Text style={{color: '#334F74', fontSize: 16, lineHeight: 20}}>
                    1회용 필터 정보
                </Text>
                <Text style={{color: '#334F74', fontSize: 16, lineHeight: 20}}>
                    산소마스크 협회협회...
                </Text>
            </View>
        </ScrollView>
    )
}

export default IdeaDetailScreen;