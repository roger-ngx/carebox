import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { size } from 'lodash';

const ExpandableText = ({text, maxLength=200, containerStyle}) => {
    const [ shownText, setShownText ] = useState();
    
    useEffect(() => {
        if(size(text) > maxLength){
            setShownText(text.substring(0, (maxLength-3)) + '...');
        }else{
            setShownText(text);
        }
    }, [text]);

    const onExpandText = () => setShownText(text);

    return (
        <View style={containerStyle}>
            <Text style={{fontSize: 16, color: '#334F74', lineHeight: 24}}>
                {shownText}
                {
                    size(shownText) < size(text) &&
                    <TouchableOpacity style={{paddingHorizontal: 8}} onPress={onExpandText}><Text>더보기</Text></TouchableOpacity>
                }
            </Text>
        </View>
    )
}

export default ExpandableText;