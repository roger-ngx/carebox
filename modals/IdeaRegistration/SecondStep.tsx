import React from 'react';
import { View, Text } from 'react-native';
import { map } from 'lodash';
import TouchableTag from '../../components/TouchableTag';
import { CheckBox } from 'react-native-elements';

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

const SecondStep = () => {

    return(
        <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#334F74'}}>
                * scamper 기법을 활용하면 더 좋은 아이디어가 탄생 할 수 있어요.
            </Text>
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
        </View>
    )
}

export default SecondStep;