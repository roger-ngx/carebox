import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

const LoadingModal = () => (
    <Modal
        isVisible={true}
        style={{margin: 0}}
        hasBackdrop={false}
    >
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
        >
            <ActivityIndicator size='large' color='white' />
        </View>
    </Modal>
)

export default LoadingModal;