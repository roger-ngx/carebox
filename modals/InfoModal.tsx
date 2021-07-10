import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';

const InfoModal = ({isVisible, children, onClose, clickOutsideToClose=false}) => {

    return (
        <Modal
            isVisible={isVisible}
            style={{margin: 0}}
            onBackButtonPress={clickOutsideToClose && onClose}
            onBackdropPress={clickOutsideToClose && onClose}
            hasBackdrop={true}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '80%', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 20}}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default InfoModal;
