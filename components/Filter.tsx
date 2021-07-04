import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { map } from 'lodash';
import FilterItem from './FilterItem';

const FILTERS = [ '전체', '의료기기', '의료용품', '서비스', '업무', '기타' ];

const Filter = ({value, setValue, containerStyle}) => {

    return (
        <ScrollView
            horizontal
            bounces={false}
            style={{...containerStyle}}
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
    )
}

export default Filter;