import React, { useState , useEffect} from 'react';
import { View, Text } from 'react-native';
import { map } from 'lodash';
import TouchableTag from '../../components/TouchableTag';
import { CheckBox } from 'react-native-elements';

const CATEGORIES = ['의료기기', '의료용품', '서비스', '업무', '기타'];

const IDEA_TYPES=[
    '새로운 제안 또는 아이디어',
    '이미 있는것의 업그레이드',
    '제품의 재도입',
    '기타'
]

const FirstStep = ({idea}) => {

    const [ category, setCategory ] = useState(idea.idea.category);
    const [ ideaType, setIdeaType ] = useState(idea.idea.type);

    useEffect(() => {
        idea.setCategory(category);
        idea.setType(ideaType);
    }, [category, ideaType])

    return(
        <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>*카테고리를 선택해 주세요.</Text>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 8
                }}
            >
                {
                    map(CATEGORIES, cat => (
                        <View style={{margin: 4}} key={cat}>
                            <TouchableTag
                                title={cat}
                                isSelected={category===cat}
                                onPress={() => {
                                    setCategory(category===cat ? '' : cat)
                                }}
                            />
                        </View>
                    ))
                }
            </View>

            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 32, marginBottom: 16}}>*어떤 아이디어인가요?</Text>
            {
                map(IDEA_TYPES, type => (
                    <CheckBox
                        key={type}
                        title={type}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
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
                        checked={ideaType===type}
                        onPress={() => { setIdeaType(ideaType===type ? '' : type) }}
                    />
                ))
            }
        </View>
    )
}

export default FirstStep;