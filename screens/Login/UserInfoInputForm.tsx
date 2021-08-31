import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { isEmpty } from 'lodash';

import CBDropDownPicker from 'components/CBDropDownPicker';
import { checkNicknameExists } from '../../firebase/UserRepository';
import { JOBS } from 'constants/values';

const UserInfoInputForm = ({user={}, onUserInfoChange}) => {

    const [ nickName, setNickName ] = useState(user.nickName);
    const [ gender, setGender ] = useState(user.gender);
    const [ department, setDepartment ] = useState(user.department);
    const [ yearsOnJob, setYearsOnJob ] = useState(user.yearsOnJob);
    const [ isNicknameExists, setNicknameExists ] = useState();
    const [ nickNameVerifiedIcon, setNickNameVerifiedIcon ] = useState();

    useEffect(() => {
        onUserInfoChange({nickName, gender, department, yearsOnJob})
    }, [nickName, gender, department, yearsOnJob])

    useEffect(() => {
        if(isNicknameExists === false){
            setNickNameVerifiedIcon(<Icon name='check' color='green' />)
        }
        if(isNicknameExists === true){
            setNickNameVerifiedIcon(<Icon name='close' color='red' />)
        }
    }, [isNicknameExists])

    const checkNickname = async() => {
        const ret = await checkNicknameExists(nickName);
        
        console.log(ret);

        setNicknameExists(ret.data.isExists);
    }

    return (
        <>
            <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8}}>닉네임</Text>

            <Input
                inputStyle={{
                    fontSize: 18,
                    padding: 16,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    borderWidth: 0
                }}
                inputContainerStyle={{borderBottomWidth: 0, backgroundColor: '#F1F1F1',}}
                containerStyle={{paddingHorizontal: 0, borderBottomWidth: 0}}
                placeholder='-를 제외하고 입력해 주세요'
                value={nickName}
                onChangeText={setNickName}
                onBlur={() => {
                    if(!isEmpty(nickName)){
                        checkNickname();
                    }
                }}
                rightIcon={nickNameVerifiedIcon}
                errorStyle={{display: 'none'}}
            />

            <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8, marginTop: 32}}>성별</Text>

            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: 32
                }}
            >
                <TouchableOpacity
                    style={[styles.genderBtn, styles.genderBtnLeft, gender==='M'?styles.genderActiveBtn:styles.genderDeactiveBtn]}
                    onPress={() => setGender('M')}
                >
                    <Text style={[styles.genderText, {color: gender==='M'?'white':'#7e7e7e'}]}>남자</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.genderBtn, gender==='F'?styles.genderActiveBtn:styles.genderDeactiveBtn]}                                
                    onPress={() => setGender('F')}
                >
                    <Text style={[styles.genderText, {color: gender==='F'?'white':'#7e7e7e'}]}>여자</Text>
                </TouchableOpacity>
            </View>

            <CBDropDownPicker
                title='직군'
                placeholder='선택해 주세요.'
                items={JOBS}
                value={department}
                setValue={setDepartment}
                // open={openJobSelection}
                // setOpen={() => setOpenJobSelection(!openJobSelection)}
            />

            <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8, marginTop: 32}}>연차</Text>
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#F1F1F1',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{padding: 16}}   
                    onPress={() => yearsOnJob>1&&setYearsOnJob(yearsOnJob-1)}                       
                >
                    <Icon
                        name='remove-circle-outline'
                        size={32}
                    />
                </TouchableOpacity>
                <Text style={{flex: 1, textAlign: 'center', fontSize: 18}}>{yearsOnJob} 년</Text>
                <TouchableOpacity
                    style={{padding: 16}} 
                    onPress={() => setYearsOnJob(yearsOnJob+1)}                               
                >
                    <Icon
                        name='add-circle-outline'
                        size={32}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    genderBtn: {
        flex: 1, paddingVertical: 16, borderRadius: 6
    },
    genderBtnLeft: {
        marginRight: 4
    },
    genderActiveBtn: {
        backgroundColor: '#1379FF',
        color: 'white'
    },
    genderDeactiveBtn: {
        backgroundColor: '#F1F1F1',
        color: '#7e7e7e'
    },
    genderText: {
        fontSize: 18, textAlign: 'center'
    }
})

export default UserInfoInputForm;