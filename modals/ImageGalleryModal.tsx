import React from 'react';
import Modal from 'react-native-modal';
import { View, TouchableOpacity } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { Icon } from 'react-native-elements';
import { map } from 'lodash';
import FastImage from 'react-native-fast-image';

const ImageGalleryModal = ({imageUris, onClose, initialPage=0}) => {

    return (
        <Modal
            isVisible={true}
            style={{margin: 0}}
            onBackButtonPress={onClose}
            hasBackdrop={false}
        >
            <View
                style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            >
                <TouchableOpacity
                    onPress={onClose}
                    style={{position: 'absolute', top: 60, right: 20, zIndex: 100}}
                >
                    <Icon
                        color='white'
                        name='close'
                        size={32}
                    />
                </TouchableOpacity>
                <Gallery
                    images={ map(imageUris, uri => ({ source: { uri } }))}
                    initialPage={initialPage}
                    imageComponent={(imageProps) => (<FastImage {...imageProps}/>)}
                />
            </View>
        </Modal>
    )
}

export default ImageGalleryModal;