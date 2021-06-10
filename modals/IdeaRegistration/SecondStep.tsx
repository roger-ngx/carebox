import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { map } from 'lodash';
import { CheckBox, Icon } from 'react-native-elements';
import InfoModal from '../InfoModal';
import RoundButton from '../../components/RoundButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCAMPERS =[
    'S : 대체하기(소재, 방식, 원리)',
    'C : 조합하기(소재, 목적, 색, 기능)',
    'A : 응용하기',
    'M : 수정, 확대, 축소하기',
    'P : 용도의 전환',
    'E : 제거하기',
    'R : 역발상',
    '스캠퍼 기법을 사용하지 않고 진행할게요.'
]

const SecondStep = ({idea}) => {
    const [ showModal, setShowModal ] = useState(false);

    idea.setScamper('S : 대체하기(소재, 방식, 원리)');

    return(
        <View>
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#334F74'}}>
                    * scamper 기법을 활용하면 더 좋은 아이디어가 탄생 할 수 있어요.<Icon containerStyle={{marginBottom: -4}} type='material-community' name='help-circle-outline' color='#334F74' />
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    marginTop: 8
                }}
            >
                {
                    map(SCAMPERS, scamper => (
                        <CheckBox
                            title={scamper}
                            containerStyle={{
                                backgroundColor: 'transparent',
                                borderWidth: 0,
                                marginLeft: 0,
                                marginTop: 0,
                                paddingLeft: 0,
                                paddingTop: 0
                            }}
                            size={24}
                            textStyle={{fontSize: 15, fontWeight: 'normal', color: '#334F74'}}
                        />
                    ))
                }
            </View>
            <InfoModal isVisible={showModal}>
                <View style={{backgroundColor: 'white', width: '80%', padding: 24, borderRadius: 20}}>
                    <Text style={{color: '#1D395F', fontSize: 24, marginBottom: 24}}>Scamper란?</Text>
                    <Text style={{color: '#1D395F', fontSize: 15}}>창의력 증진기법으로 아이디어를 얻기 위해 의도적으로 시험할 수 있는 7가지 규칙을 의미한다.</Text>
                    <View style={{marginVertical: 32}}>
                        <Text style={styles.modalTxt}>- S=Substitute [기존것을 다른 것으로 대체해 보라]</Text>
                        <Text style={styles.modalTxt}>- C=Combine [A와 B를 합쳐 보라]</Text>
                        <Text style={styles.modalTxt}>- A=Adapt [다른 데 적용해 보라]</Text>
                        <Text style={styles.modalTxt}>- M=Modify, Minify, Magnify [변경, 축소, 확대해 보라] </Text>
                        <Text style={styles.modalTxt}>- P=Put to other uses [다른 용도로 써 보라]</Text>
                        <Text style={styles.modalTxt}>- E=Eliminate [제거해 보라] </Text>
                        <Text style={styles.modalTxt}>- R=Reverse, Rearrange [거꾸로 또는 재배치해 보라] </Text>
                    </View>
                    <RoundButton
                        text='확인'
                        onPress={() => setShowModal(false)}
                    />
                </View>
            </InfoModal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalTxt: {
        color: '#001240',
        fontSize: 13
    }
});

export default SecondStep;