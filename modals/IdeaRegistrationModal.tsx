import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import FirstStep from './IdeaRegistration/FirstStep';
import RoundButton from '../components/RoundButton';
import SecondStep from './IdeaRegistration/SecondStep';

const IdeaRegistrationModal = () => {

    const [ currentStep, setCurrentStep ] = useState(1);

    return (
        <Modal
            isVisible={true}
            style={{margin: 0}}
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
                    <View
                        style={{flex: 1}}
                    >
                        {
                            currentStep === 1 &&
                            <FirstStep />
                        }
                        {
                            currentStep === 2 &&
                            <SecondStep />
                        }
                    </View>
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