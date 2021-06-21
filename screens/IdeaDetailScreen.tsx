import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import PickedIdea from '../components/Idea/PickedIdea';
import { Divider, Icon } from 'react-native-elements';
import { map } from 'lodash';

const IdeaDetailScreen = ({idea}) => {
    if(!idea) return null;

    const { detail, images } = idea;

    return (
        <View
            style={{flex: 1, backgroundColor: 'white'}}
        >
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <PickedIdea />
                <Divider/>
                <View style={{padding: 20}}>
                    <View style={{marginBottom: 8}}>
                        <Text style={{color: '#898989', marginBottom: 2}}>구체적 대상</Text>
                        <Text style={{color: '#334F74', fontSize: 16}}>{detail.object}</Text>
                    </View>
                    <View style={{marginBottom: 8}}>
                        <Text style={{color: '#898989', marginBottom: 2}}>구체적 상황</Text>
                        <Text style={{color: '#334F74', fontSize: 16}}>{detail.situation}</Text>
                    </View>
                    <View style={{marginBottom: 8}}>
                        <Text style={{color: '#898989', marginBottom: 2}}>해결방법</Text>
                        <Text style={{color: '#334F74', fontSize: 16}}>{detail.solution}</Text>
                    </View>
                </View>
                <Divider />
                <View style={{padding: 20}}>
                    <Text style={{color: '#7D7D7D', marginBottom: 8}}>이미지</Text>
                    {
                        map(images, ({title, url}) => (<>
                            <Image style={{height: 150, marginBottom: 8}} source={{uri: url}} />
                            <Text  style={{color: '#334F74', fontSize: 16}}>{title}</Text>
                        </>))
                    }
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
        </View>
    )
}

export default IdeaDetailScreen;