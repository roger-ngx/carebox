import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { map } from 'lodash';
import FilterItem from './FilterItem';

const FILTERS = [ '전체', '의료기기', '의료용품', '서비스', '업무', '기타' ];

const Filter = ({value, setValue, containerStyle}) => {

    return (
        <View style={[{maxHeight: 36, justifyContent: 'center', alignItems: 'center'}, containerStyle]}>
            <ScrollView
                horizontal
                bounces={false}
                contentContainerStyle={{width: '100%'}}
                showsHorizontalScrollIndicator={false}
            >
                {
                    map(FILTERS, filter => (
                            <TouchableOpacity
                                style={{marginRight: 16}}
                                onPress={() => setValue(filter)}
                            >
                                <FilterItem text={filter} active={value===filter} />
                            </TouchableOpacity>
                        )
                    )
                }
            </ScrollView>
        </View>
    )
}

export default Filter;