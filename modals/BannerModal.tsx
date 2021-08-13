import React from 'react';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import { ScrollView, TouchableOpacity, Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { map } from 'lodash';

const AppMainFunction = ({index, title, content, icon, containerStyle}) => (
    <View style={[{width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 16}, containerStyle]}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: '#061F5F', fontSize: 20, marginRight: 4}}>{index}</Text>
                <Text style={{fontWeight: 'bold', color: '#4A7CFF', fontSize: 20}}>{title}</Text>
            </View>
            <Image source={icon} style={{width: 32, height: 32}}/>
        </View>
        <Divider style={{marginVertical: 16 }}/>
        <View>
            {content}
        </View>
    </View>
)

const ScamperItem = ({category, title, contents, containerStyle}) => (
    <View style={[{width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 16, alignItems: 'center'}, containerStyle]}>
        <View
            style={{
                marginTop: -34,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 50,
                    backgroundColor: '#01113A',
                    alignSelf: 'flex-start',
                }}
            >
                <Text style={{alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: 16}}>{category}</Text>
            </View>
        </View>
        <View style={{marginTop: 16}}>
            <Text style={{textAlign: 'center', color: '#373737', fontSize: 20}}>&#x275C;&#x275C;</Text>
            <Text style={{textAlign: 'center', color: '#373737', fontWeight: '500', fontSize: 16, lineHeight: 24}}>{title}</Text>
            <Divider style={{marginVertical: 16 }}/>
            <View style={{alignItems: 'center'}}>
                {
                    map(contents, content => (<Text style={{textAlign: 'center', color: '#2E2E2E', lineHeight: 24, alignItems: 'center'}}>&#x2022; {content}</Text>))
                }
            </View>
        </View>
    </View>
)

const BannerModal = ({onClose}) => (
    <Modal
        style={{margin: 0}} isVisible={true}
        onBackButtonPress={onClose}
    >
        <SafeAreaView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 32,
                    right: 0,
                    padding: 24,
                    zIndex: 1
                }}
                onPress={onClose}
            >
                <Icon
                    name='close'
                    color='white'
                />
            </TouchableOpacity>
            <ScrollView>
                <View style={{paddingHorizontal: 20, paddingVertical: 36, backgroundColor: '#1379FF', alignItems: 'center'}}>
                    <Image 
                        source={require('assets/icons/nurse.png')}
                        style={{width: 80, height: 80}}
                    />
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                        간호 혁신 아이디어에 도전하세요!
                    </Text>
                    <Text style={{color: 'white', textAlign: 'center', marginTop: 16}}>
                        {`“공유한 아이디어가 채택이 되면 후원금과 함께 실제 개발될 수 있도록 도와드립니다.”`}
                    </Text>
                </View>

                <View style={{paddingHorizontal: 20, paddingVertical: 36, backgroundColor: '#01113A', alignItems: 'center'}}>
                    <Text
                        style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 24}}
                    >
                        이렇게 도전하세요!
                    </Text>

                    <AppMainFunction
                        index='01'
                        title='아이디어 등록'
                        content={<Text style={{color: '#2E2E2E'}}>평소에 발견한 문제점을 아이디어로 등록해보세요. <Text style={{fontWeight: 'bold'}}>SCAMPER</Text> 기법을 활용하여 아이디어를 도출해 볼 수 있습니다.</Text>}
                        icon={require('assets/icons/idea.png')}
                        containerStyle={{marginBottom: 24}}
                    />

                    <AppMainFunction
                        index='02'
                        title='아이디어 참여'
                        content={<Text style={{color: '#2E2E2E'}}>아이디어가 더 발전할 수 있도록, 아이디어를 평가해보세요. 코멘트와 별점을 남길 수 있습니다.</Text>}
                        icon={require('assets/icons/collaboration.png')}
                        containerStyle={{marginBottom: 24}}
                    />

                    <AppMainFunction
                        index='03'
                        title='팀 결성'
                        content={<Text style={{color: '#2E2E2E'}}>내 아이디어에 마음에 드는 코멘트가 있다면 Pick을 해보세요. 상대방이 수락하면 팀이 결성됩니다.</Text>}
                        icon={require('assets/icons/united.png')}
                        containerStyle={{marginBottom: 24}}
                    />

                    <AppMainFunction
                        index='04'
                        title='프로토타입 실현'
                        content={<Text style={{color: '#2E2E2E'}}>팀이 결성됐다면, 아이디어가 구체화될 수 있도록 팀원들과 프로토타입을 실현해봅니다.</Text>}
                        icon={require('assets/icons/mockup.png')}
                    />
                </View>

                <View style={{backgroundColor: '#FFFCBD', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 36}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: '#01113A', fontWeight: 'bold', marginBottom: 12}}>carebox가 추천하는 디자인 기법</Text>
                        <Text style={{color: '#01113A', fontWeight: 'bold', fontSize: 28, marginBottom: 24}}>“SCAMPER”</Text>
                        <Text style={{color: '#01113A'}}>7가지 규칙으로 아이디어를 도출해낸다!</Text>
                    </View>
                    <View style={{width: '100%'}}>
                        <ScamperItem
                            category='Substitue / 대체하기'
                            title={`기존의 것을 다른것으로 대체함으로써\n고정적인 시각을 새롭게\n바라볼 수 있도록 하는 질문.`}
                            contents={['무엇을 바꿀 수 있을까?', '그것 대신에 무엇을 활용할 수 있을까?', '그 대신 어떤 프로세스를 활용할 수 있을까?', '그 대신 어떤 다른 재료를 사용할 수 있을까?']}
                            containerStyle={{marginBottom: 24, marginTop: 32}}
                        />
                        <ScamperItem
                            category='Combine / 결합하기'
                            title={`두 가지 이상의 것을 결합하여 새로운 것을\n도출할 수 있도록 하는 질문.`}
                            contents={['무엇을 조합할 수 있을까?', '어떻게 일부를 연결할 수 있을까?', '어떤 목적을 서로 조합할 수 있을까?']}
                            containerStyle={{marginBottom: 24, marginTop: 32}}
                        />
                        <ScamperItem
                            category='Adapt / 응용하기'
                            title={`어떤 것을 다른 목적과 조건에 맞게\n응용해 볼 수 있도록 하는 질문.`}
                            contents={['그것이 시사하는 다른 아이디어는 무엇일까?', '그것과 비슷한 것 중에 현재 문제에 응용할 수 있는 게 있을까?', '과거에 비슷한 상황이 있었을까?']}
                            containerStyle={{marginBottom: 24, marginTop: 32}}
                        />
                        <ScamperItem
                            category='Modify / 수정하기'
                            title={`어떤 것의 특성이나 변형하고 확대, 축소하여\n새로운 것을 생각해 볼 수 있도록 하는 질문.`}
                            contents={['어떻게 수정할 수 있을까?', '색이나 형태를 어떻게 바꿀 수 있을까?', '무엇을 늘릴 수 있을까? / 크게 확장할 수 있을까?', '무엇을 줄일 수 있을까? / 작게 줄일 수 있을까?', '무엇을 현대화 할 수 있을까?']}
                            containerStyle={{marginBottom: 24, marginTop: 32}}
                        />
                        <ScamperItem
                            category='Put to other users / 전용하기'
                            title={`어떤 것을 전혀 다른 용도로 생각해 볼 수 있도록 하는 질문.`}
                            contents={['현재 상태에서 어떤 다른 목적으로 활용할 수 있을까?', '수정하면 어떤 목적으로 활용할 수 있을까?']}
                            containerStyle={{marginBottom: 24, marginTop: 32}}
                        />
                        <ScamperItem
                            category='Eliminate / 제거하기'
                            title={`어떤 것의 일부 또는 제거가 가능한\n기능들을 찾아보는 질문.`}
                            contents={['무엇을 제거할 수 있을까?', '제거해도 작동하는 것에는 무엇이 있을까?']}
                            containerStyle={{marginBottom: 24, marginTop: 32}}
                        />
                        <ScamperItem
                            category='Rearrange / 재배열하기'
                            title={`어떤 것의 순서, 위치, 기능, 모양등을 재정렬하여\n새로운 것을 생각해 볼 수 있도록 하는 질문.`}
                            contents={['패턴을 바꿔도 작동할까?', '무엇을 교체할 수 있을까?', '무엇을 재배열할 수 있을까?']}
                            containerStyle={{marginBottom: 24, marginTop: 32}}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </Modal>
)

export default BannerModal;