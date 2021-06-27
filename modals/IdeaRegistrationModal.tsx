import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import FirstStep from './IdeaRegistration/FirstStep';
import RoundButton from '../components/RoundButton';
import SecondStep from './IdeaRegistration/SecondStep';
import ThirdStep from './IdeaRegistration/ThirdStep';
import ForthStep from './IdeaRegistration/ForthStep';
import Idea from '../models/Idea';
import StepIndicator from '../components/StepIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { addNewIdea } from '../firebase/IdeaRepository';
import InfoModal from './InfoModal';

const IdeaRegistrationModal = ({onClose}) => {

    const [ currentStep, setCurrentStep ] = useState(1);
    const [idea] = useState(new Idea());
    const [ openResultModal, setOpenResultModal ] = useState(false);
    const [ progressing, setProgressing ] = useState(false);

    const user = useSelector(state => state.user.currentUser);
    const userProfile = useSelector(state => state.user.userProfileData);

    console.log('user', user);

    const onNextStep = () => {
        if(currentStep===4){
            addIdea();
        }else{
            setCurrentStep(currentStep + 1)
        }
    }

    const addIdea = async () => {
        idea.setOwnerId(user.uid);

        setProgressing(true);

        const ret = await addNewIdea(idea, userProfile);
        if(ret){
            setOpenResultModal(true);
        }
        setProgressing(false);
    }

    return (
        <Modal
            isVisible={true}
            style={{margin: 0}}
            onBackButtonPress={onClose}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#F1F7FF',
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 40,
                        zIndex: 999,
                        width: '100%',
                        backgroundColor: 'white'
                    }}
                >
                    <View 
                        style={{
                            flexDirection: 'row',
                            marginTop: 16,
                            marginBottom: 24,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 20,
                                display: currentStep > 1 ? 'flex' : 'none'
                            }}
                            onPress={() => {
                                if(currentStep > 1){
                                    setCurrentStep(currentStep -1);
                                }
                            }}
                        >
                            <Icon name='arrow-back-ios' color='#AEAEAE' />
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: '#334F74',
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                flex: 1,
                                marginRight: currentStep === 1 ? -64 : 0
                            }}
                        >
                            아이디어 등록
                        </Text>
                        <TouchableOpacity
                            style={{paddingHorizontal: 20}}
                            onPress={onClose}
                        >
                            <Icon name='close' color='#AEAEAE' />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', justifyContent: 'center', marginBottom: 20}}>
                        <StepIndicator step={currentStep}/>
                    </View>
                </View>
                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        marginTop: 120
                    }}
                >
                    <ScrollView>
                        {
                            currentStep === 1 &&
                            <FirstStep idea={idea}/>
                        }
                        {
                            currentStep === 2 &&
                            <SecondStep idea={idea} />
                        }
                        {
                            currentStep === 3 &&
                            <ThirdStep idea={idea} />
                        }

                        {
                            currentStep === 4 &&
                            <ForthStep idea={idea} />
                        }
                        <View style={{margin: 50}} />
                    </ScrollView>
                </View>
                </KeyboardAwareScrollView>
                <View style={{margin: 20}}>
                    <RoundButton
                        text='저장하고 다음'
                        onPress={onNextStep}
                        disabled={progressing}
                        loading={progressing}
                    />
                </View>
                {
                    openResultModal &&
                    <InfoModal
                        isVisible={openResultModal}
                        onClose={() => setOpenResultModal(false)}
                    >
                        <View style={{width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 20}}>
                            <Icon
                                name='mood'
                                color='#001240'
                                size={36}
                            />
                            <Text style={{color: '#001240', fontSize: 16, textAlign: 'center', marginVertical: 20}}>아이디어 등록이 완료되었습니다!</Text>
                            <RoundButton
                                text='확인'
                                onPress={() => {
                                    setOpenResultModal(false);
                                    onClose();
                                }}
                            />
                        </View>
                    </InfoModal>
                }
            </SafeAreaView>
        </Modal>
    )
}

export default IdeaRegistrationModal;