import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, ScrollView, StyleSheet } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import InfoModal from '../../modals/InfoModal';
import IdeaRegistrationModal from '../../modals/IdeaRegistrationModal';
import CBDropDownPicker from '../../components/CBDropDownPicker';

const JOBS = [
    { label:'병동', value:'병동' },
    { label:'중환자실', value:'중환자실' },
    { label:'수술실', value:'수술실' },
    { label:'검사실', value:'검사실' },
    { label:'외래', value:'외래' }
]

const UserInfoInput = () => {
    const [ openJobSelection, setOpenJobSelection ] = useState(false);

    const [ nickName, setNickName ] = useState();
    const [ gender, setGender ] = useState();
    const [ jobType, setJobType ] = useState();
    const [ timeOnJob, setTimeOnJob ] = useState(1);

    const [ isOpenConfirmModal, setOpenConfirmModal ] = useState(false);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1, padding: 24, marginTop: 60}}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: '#001240'}}>
                    프로필을 등록해 주세요!
                </Text>

                <View
                    style={{
                        marginTop: 48,
                        flex: 1
                    }}
                >
                    <ScrollView
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >

                        <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8}}>닉네임</Text>

                        <TextInput
                            style={{
                                fontSize: 18,
                                backgroundColor: '#F1F1F1',
                                padding: 16,
                                alignSelf: 'flex-start',
                                alignItems: 'center',
                                width: '100%'
                            }}
                            placeholder='-를 제외하고 입력해 주세요'
                            value={nickName}
                            onChangeText={setNickName}
                        />

                        <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8, marginTop: 32}}>성별</Text>

                        <View
                            style={{
                                flexDirection: 'row'
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
                            items={JOBS}
                            value={jobType}
                            setValue={setJobType}
                            open={openJobSelection}
                            setOpen={() => setOpenJobSelection(!openJobSelection)}
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
                                onPress={() => timeOnJob>1&&setTimeOnJob(timeOnJob-1)}                       
                            >
                                <Icon
                                    name='remove-circle-outline'
                                    size={32}
                                />
                            </TouchableOpacity>
                            <Text style={{flex: 1, textAlign: 'center', fontSize: 18}}>{timeOnJob} 년</Text>
                            <TouchableOpacity
                                style={{padding: 16}} 
                                onPress={() => setTimeOnJob(timeOnJob+1)}                               
                            >
                                <Icon
                                    name='add-circle-outline'
                                    size={32}
                                />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#4A7CFF',
                            paddingVertical: 16,
                            borderRadius: 50,
                            width: '100%',
                            alignSelf: 'flex-end'
                        }}
                        onPress={() => setOpenConfirmModal(true)}
                    >
                        <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white', textAlign: 'center'}}>
                            다음
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                isOpenConfirmModal &&
                <IdeaRegistrationModal />
                // <InfoModal
                //     isVisible={isOpenConfirmModal}
                //     onClose={() => setOpenConfirmModal(false)}
                // >
                //     <View
                //         style={{
                //             width: '80%',
                //             padding: 24,
                //             borderRadius: 36,
                //             backgroundColor: 'white',
                //             alignItems: 'center'
                //         }}
                //     >
                //         <Icon name='mood' size={48} color='oreange'/>
                //         <Text style={{fontSize: 15, marginTop: 24}}><Text style={{fontWeight: 'bold', fontSize: 15}}>{nickName}</Text> 간호사님, 축하합니다!</Text>
                //         <Text style={{fontSize: 15, marginTop: 16}}><Text style={{fontWeight: 'bold', fontSize: 15}}>carebox</Text>에 가입되셨습니다.</Text>

                //         <TouchableOpacity
                //             style={{
                //                 width: '100%',
                //                 borderRadius: 50,
                //                 paddingVertical: 16,
                //                 backgroundColor: '#1379FF',
                //                 alignItems: 'center',
                //                 marginTop: 48
                //             }}
                //             onPress={() => setOpenConfirmModal(false)}
                //         >
                //             <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>확인</Text>
                //         </TouchableOpacity>
                //     </View>
                // </InfoModal>
            }
        </SafeAreaView>
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

export default UserInfoInput;