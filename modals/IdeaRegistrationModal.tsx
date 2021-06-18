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

const IdeaRegistrationModal = ({onClose}) => {

    const [ currentStep, setCurrentStep ] = useState(1);
    const [idea] = useState(new Idea());

    useEffect(() => {
        if(currentStep == 5){
            console.log(idea);
        }
    }, [currentStep]);

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
                        <Text
                            style={{
                                color: '#334F74',
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                flex: 1,
                                marginRight: -70
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
                        onPress={() => setCurrentStep(currentStep + 1)}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default IdeaRegistrationModal;