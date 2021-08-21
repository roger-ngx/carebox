import { map, get, set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const ThirdStep = ({idea, onFocusChange}) => {

    console.log('idea', idea);

    const [subject, setSubject] = useState(idea.idea.subject);
    const [problemObject, setProblemObject] = useState(idea.idea.detail.object);
    const [problemSituation, setProblemSituation] = useState(idea.idea.detail.situation);
    const [problemSolution, setProblemSolution] = useState(idea.idea.detail.solution);
    const [ isTextFocused, setTextFocused ] = useState(false);

    useEffect(() => {
        idea.setSubject(subject);
    }, [subject]);

    useEffect(() => {
        onFocusChange(isTextFocused);
    }, [isTextFocused]);

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
                    onFocus={() => setTextFocused(true)}
                    onBlur={() => setTextFocused(false)}
                    textAlignVertical='top'
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
                        onFocus={() => setTextFocused(true)}
                        onBlur={() => setTextFocused(false)}
                        textAlignVertical='top'
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
                        onFocus={() => setTextFocused(true)}
                        onBlur={() => setTextFocused(false)}
                        textAlignVertical='top'
                    />
                </View>

                {
                    idea.scamperRequired &&
                    <View
                        style={{
                            marginTop: 16
                        }}
                    >
                        <Text style={styles.headerTxt}>
                            해결방법
                        </Text>

                        {
                            map(idea.scampers, scamper => (
                                <View key={scamper} style={{marginBottom: 16}}>
                                    <Text style={{fontSize: 10, color: '#001240', marginBottom: 8}}>
                                    {scamper}
                                    </Text>

                                    <TextInput
                                        placeholder={`- 무엇을 바꿀 수 있을까?\n- 그것 대신에 무엇을 활용할 수 있을까?\n- 그 대신 어떤 프로세스를 활용할 수 있을까?\n- 그 대신 어떤 다른 재료를 사용할 수 있을까?`}
                                        style={[styles.textInput, {minHeight: 100}]}
                                        multiline={true}
                                        numberOfLines={5}
                                        maxLength={2000}
                                        value={get(problemSolution, `${scamper}`)}
                                        onChangeText={(text) => {
                                            set(problemSolution, `${scamper}`, text);
                                            setProblemSolution({...problemSolution})
                                        }}
                                        textAlignVertical='top'
                                        onFocus={() => setTextFocused(true)}
                                        onBlur={() => setTextFocused(false)}
                                    />
                                </View>
                            ))
                        }
                    </View>
                }
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