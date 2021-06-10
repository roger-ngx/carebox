import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, SafeAreaView, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';

import FirstStep from './IdeaRegistration/FirstStep';
import RoundButton from '../components/RoundButton';
import SecondStep from './IdeaRegistration/SecondStep';
import ThirdStep from './IdeaRegistration/ThirdStep';
import ForthStep from './IdeaRegistration/ForthStep';
import Idea from '../models/Idea';

const IdeaRegistrationModal = () => {

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
            avoidKeyboard={true}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
            >
                <Text
                    style={{
                        color: '#334F74',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 16,
                        marginBottom: 24
                    }}
                >
                    아이디어 등록
                </Text>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#F1F7FF',
                        padding: 20
                    }}
                >
                    <ScrollView
                        style={{flex: 1}}
                        showsVerticalScrollIndicator={false}
                    >
                        <KeyboardAvoidingView
                            style = {{ flex: 1 }}
                            behavior="position" enabled
                        >
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
                        </KeyboardAvoidingView>
                    </ScrollView>
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