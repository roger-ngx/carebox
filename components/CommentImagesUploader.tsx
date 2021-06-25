import React, { useState, useEffect } from 'react';
import { map, size } from 'lodash';
import { View } from 'react-native';

import PhotoUploadButton from './PhotoUploadButton';
import UploadedPhoto from './UploadedPhoto';

const CommentImagesUploader = ({onImagesChange}) => {

    const [ images, setImages ] = useState([])

    useEffect(() => {
        onImagesChange && onImagesChange(images);
    }, [images])

    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}
        >
            {
                map(images, (image, index) => (
                    <View style={{marginRight: 8}}>
                        <UploadedPhoto
                            key={image}
                            uri={image}
                            onDelete={() => {
                                images.splice(index, 1);
                                setImages([...images])
                            }}
                        />
                    </View>
                ))
            }
            {
                size(images) < 3 &&
                <PhotoUploadButton count={size(images)} max={3} onReturnUri={uri => setImages([...images, uri])}/>
            }
        </View>
    )
}

export default CommentImagesUploader;