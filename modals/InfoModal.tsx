import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';

const InfoModal = ({isVisible, children, onClose}) => {

    return (
        <Modal
            isVisible={isVisible}
            style={{margin: 0}}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            hasBackdrop={true}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {children}
            </View>
        </Modal>
    )
}

export default InfoModal;
