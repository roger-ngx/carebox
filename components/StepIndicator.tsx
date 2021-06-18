import React from 'react';
import { View, Text } from 'react-native';

const StepIndicator = ({step}) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center'
            }}
        >
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: step ==1 ? '#4A7CFF' : '#D8E9FF', marginBottom: 8}}>1</Text>
                <View style={{backgroundColor: step ==1 ? '#4A7CFF' : '#D8E9FF', width: 16, height: 16, borderRadius: 16}} />
            </View>
            <View style={{backgroundColor: '#D8E9FF', width: 24, height: 3, marginBottom: 7}} />
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: step ==2 ? '#4A7CFF' : '#D8E9FF', marginBottom: 8}}>2</Text>
                <View style={{backgroundColor: step ==2 ? '#4A7CFF' : '#D8E9FF', width: 16, height: 16, borderRadius: 16}} />
            </View>
            <View style={{backgroundColor: '#D8E9FF', width: 24, height: 3, marginBottom: 7}} />
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: step ==3 ? '#4A7CFF' : '#D8E9FF', marginBottom: 8}}>3</Text>
                <View style={{backgroundColor: step ==3 ? '#4A7CFF' : '#D8E9FF', width: 16, height: 16, borderRadius: 16}} />
            </View>
            <View style={{backgroundColor: '#D8E9FF', width: 24, height: 3, marginBottom: 7}} />
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: step ==4 ? '#4A7CFF' : '#D8E9FF', marginBottom: 8}}>4</Text>
                <View style={{backgroundColor: step ==4 ? '#4A7CFF' : '#D8E9FF', width: 16, height: 16, borderRadius: 16}} />
            </View>
        </View>
    )
}

export default StepIndicator;