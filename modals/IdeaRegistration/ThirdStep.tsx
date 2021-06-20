import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const ThirdStep = ({idea}) => {

    const [subject, setSubject] = useState();
    const [problemObject, setProblemObject] = useState();
    const [problemSituation, setProblemSituation] = useState();
    const [problemSolution, setProblemSolution] = useState();

    useEffect(() => {
        idea.setSubject(subject);
    }, [subject]);

    useEffect(() => {
        const detail = {
            object: problemObject,
            situation: problemSituation,
            solution: problemSolution
        }

        idea.setIdeaDetail(detail);
    }, [problemObject, problemSituation, problemSolution]);

    return(
        <View>
            <View
                style={{
                    marginTop: 8
                }}
            >
                <Text style={styles.headerTxt}>
                    * 아이디어 제목
                </Text>
                <TextInput
                    placeholder='제목을 입력해 주세요.'
                    style={styles.textInput}
                    maxLength={50}
                    value={subject}
                    onChangeText={setSubject}
                />
            </View>
            <View
                style={{
                    marginTop: 32
                }}
            >
                <Text style={styles.headerTxt}>
                    * 아이디어 상세내용
                </Text>
                <View
                    style={{
                        marginTop: 16
                    }}
                >
                    <Text style={styles.headerTxt}>
                        구체적 대상
                    </Text>
                    <TextInput
                        placeholder='어떤것에 불편함을 느꼈나요?'
                        style={styles.textInput}
                        maxLength={50}
                        value={problemObject}
                        onChangeText={setProblemObject}
                    />
                </View>
                <View
                    style={{
                        marginTop: 16
                    }}
                >
                    <Text style={styles.headerTxt}>
                        구체적 상황
                    </Text>
                    <TextInput
                        placeholder='어떤 상황에서 불편함을 느꼈나요?'
                        style={[styles.textInput, {height: 100}]}
                        multiline={true}
                        numberOfLines={5}
                        maxLength={2000}
                        value={problemSituation}
                        onChangeText={setProblemSituation}
                    />
                </View>

                <View
                    style={{
                        marginTop: 16
                    }}
                >
                    <Text style={styles.headerTxt}>
                        해결방법
                    </Text>

                    <Text style={{fontSize: 10, color: '#001240', marginBottom: 8}}>
                        S : 대체하기(소재, 방식, 원리)
                    </Text>

                    <TextInput
                        placeholder={`- 무엇을 바꿀 수 있을까?\n- 그것 대신에 무엇을 활용할 수 있을까?\n- 그 대신 어떤 프로세스를 활용할 수 있을까?\n- 그 대신 어떤 다른 재료를 사용할 수 있을까?`}
                        style={[styles.textInput, {height: 100}]}
                        multiline={true}
                        numberOfLines={5}
                        maxLength={2000}
                        value={problemSolution}
                        onChangeText={setProblemSolution}
                    />

                    <Text style={{fontSize: 10, color: '#001240', marginBottom: 8}}>
                        M : 수정하기
                    </Text>
                    <TextInput
                        placeholder={`- 무엇을 조합할 수 있을까?\n- 어떻게 일부를 연결할 수 있을까?\n- 어떤 목적을 서로 조합할 수 있을까?`}
                        style={[styles.textInput, {height: 100}]}
                        multiline={true}
                        numberOfLines={5}
                        maxLength={2000}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#334F74'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#9C9C9C',
        borderRadius: 4,
        padding: 16,
        fontSize: 16,
        backgroundColor: 'white'
    }
});

export default ThirdStep;