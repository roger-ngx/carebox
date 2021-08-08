import React from 'react';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

const BannerModal = ({onClose}) => (
    <Modal
        style={{margin: 0}} isVisible={true}
        onBackButtonPress={onClose}
    >
        <SafeAreaView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 40,
                    right: 0,
                    padding: 24,
                    zIndex: 1
                }}
                onPress={onClose}
            >
                <Icon
                    name='close'
                    color='#333'
                />
            </TouchableOpacity>
            <ScrollView>
                <Image
                    source={require('assets/images/banner.png')}
                    style={{width: '100%'}}
                    resizeMode='stretch'
                />
            </ScrollView>
        </SafeAreaView>
    </Modal>
)

export default BannerModal;