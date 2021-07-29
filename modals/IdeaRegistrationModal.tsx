import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isEmpty } from 'lodash';

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
import { Snackbar } from 'react-native-paper';

const IdeaRegistrationModal = ({onClose}) => {

    const [ currentStep, setCurrentStep ] = useState(1);
    const [ idea ] = useState(new Idea());
    const [ openResultModal, setOpenResultModal ] = useState(false);
    const [ progressing, setProgressing ] = useState(false);

    const [ isTextFocused, setTextFocused ] = useState(false);

    const [ showSnackbar, setShowSnackbar ] = useState(false);


    const user = useSelector(state => state.user.currentUser);
    const userProfile = useSelector(state => state.user.userProfileData);

    console.log('idea', idea.images);

    const checkInput = () => {
        if(currentStep === 1){
            return !(isEmpty(idea.category) || isEmpty(idea.type));
        } else if(currentStep === 2){
            return !isEmpty(idea.scampers);
        } else if(currentStep === 3){
            return !(isEmpty(idea.subject) || isEmpty(idea.ideaDetail));
        }else{
            return idea.imageAndLinkRequired ? !(isEmpty(idea.links) || isEmpty(idea.images)) : true;
        }
    }

    const onNextStep = () => {
        if(!checkInput()){
            setShowSnackbar(true);
            return;
        }

        if(currentStep===4){
            addIdea();
        }else{
            setCurrentStep(currentStep + 1)
        }
    }

    const addIdea = async () => {
        idea.setOwnerId(user.uid);

        setProgressing(true);

        const ret = await addNewIdea(idea.idea, userProfile);
        if(ret){
            setOpenResultModal(true);
        }
        setProgressing(false);
    }

    return (
        <Modal
            isVisible={true}
            style={{margin: 0, justifyContent: 'flex-end'}}
            onBackButtonPress={onClose}
        >
            <SafeAreaView
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#F1F7FF',
                    height: '90%',
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        zIndex: 999,
                        width: '100%',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                >
                    <View 
                        style={{
                            flexDirection: 'row',
                            marginVertical: 24,
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
                        marginTop: 140,
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
                            <ThirdStep idea={idea} onFocusChange={setTextFocused}/>
                        }

                        {
                            currentStep === 4 &&
                            <ForthStep idea={idea} />
                        }
                        <View style={{margin: 50}} />
                    </ScrollView>
                </View>
                </KeyboardAwareScrollView>
                {
                    !isTextFocused &&
                    <View style={{marginHorizontal: 20, marginBottom: 20}}>
                        <RoundButton
                            text='저장하고 다음'
                            onPress={onNextStep}
                            disabled={progressing}
                            loading={progressing}
                        />
                    </View>
                }
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
            <Snackbar
                visible={showSnackbar}
                wrapperStyle={{marginBottom: 100}}
                onDismiss={() => setShowSnackbar(false)}
                duration={1500}
                style={{position: 'absolute', bottom: 20}}
            >
                <Text style={{textAlign: 'center', color: 'white'}}>
                    미입력 항목이 있습니다.
                </Text>
            </Snackbar>
        </Modal>
    )
}

export default IdeaRegistrationModal;