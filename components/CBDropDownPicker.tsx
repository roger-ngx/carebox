import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text } from 'react-native';

const CBDropDownPicker = ({title, items, value, setValue, placeholder}) => {

    const [ open, setOpen ] = useState(false);

    return (
        <View style={{position: 'relative'}}>
            <Text style={{fontSize: 20, color: '#434A3F', marginBottom: 8}}>
                {title}
            </Text>
            <DropDownPicker
                items={items}
                placeholder={placeholder}
                value={value}
                setValue={setValue}
                open={open}
                setOpen={setOpen}
                closeAfterSelecting={true}
                disableBorderRadius={true}
                style={{
                    borderColor: '#9C9C9C',
                    borderRadius: 0,
                }}
                dropDownContainerStyle={{
                    borderColor: '#9C9C9C',
                    borderRadius: 0,
                }}
                textStyle={{
                    fontSize: 15,
                    color: '#7d7d7d'
                }}
                listMode="MODAL"
                scrollViewProps={{
                    nestedScrollEnabled: true
                }}
            />
        </View>
    )
}

export default CBDropDownPicker;