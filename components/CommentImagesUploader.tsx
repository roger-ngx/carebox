import React, { useState, useEffect } from 'react';
import { map, size, isEmpty } from 'lodash';
import { View } from 'react-native';

import PhotoUploadButton from './PhotoUploadButton';
import UploadedPhoto from './UploadedPhoto';

const CommentImagesUploader = ({imageUris, onImagesChange}) => {

    const [ images, setImages ] = useState([])

    useEffect(() => {
        !isEmpty(imageUris) && setImages(imageUris);
    }, [imageUris]);

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
                    <View style={{marginRight: 8}} key={image}>
                        <UploadedPhoto
                            key={image}
                            uri={image}
                            onDelete={() => {
                                const temp = [...images];

                                temp.splice(index, 1);
                                setImages(temp)
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