import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements'

const ForthStep = () => {

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    marginTop: 8
                }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.headerTxt}>
                        * 이미지
                    </Text>
                    <Text style={styles.headerTxt}>
                        + 추가
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: '#9C9C9C',
                        borderRadius: 4,
                        padding: 32,
                        marginBottom: 8,
                        backgroundColor: 'white'
                    }}
                >
                    <Icon
                        name='camera'
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder='설명 추가'
                    style={styles.textInput}
                    maxLength={50}
                />
            </View>
            <View
                style={{
                    marginTop: 32
                }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.headerTxt}>
                        * 링크
                    </Text>
                    <Text style={styles.headerTxt}>
                        + 추가
                    </Text>
                </View>
                <TextInput
                    placeholder='링크를 입력해주세요.'
                    style={styles.textInput}
                    maxLength={50}
                />
            </View>
            <CheckBox
                title='이미지, 링크 등록없이 업로드 할래요.'
                containerStyle={{
                    backgroundColor: 'transparent',
                    paddingLeft: 0,
                    marginLeft: 0,
                    borderWidth: 0
                }}

                textStyle={{
                    color: '#334F74',
                    fontSize: 16,
                    fontWeight: 'normal'
                }}
            />
        </ScrollView>
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

export default ForthStep;