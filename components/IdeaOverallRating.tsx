import React from 'react';
import { View, Text } from 'react-native';
import { Icon, AirbnbRating } from 'react-native-elements';
import { Divider } from 'react-native-elements';

const Rating = ({type, rate}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: '#434A3F', marginRight: 12}}>{type}</Text>
        <AirbnbRating
            defaultRating={+rate}
            size={20}
            showRating={false}
        />
        <Text style={{color: '#434A3F', marginLeft: 4}}>{rate}</Text>
    </View>
)

const IdeaOverallRating = () => {

    return (
        <View
            style={{flexDirection: 'row', backgroundColor: '#EFF4F5', padding: 20, justifyContent: 'space-between'}}
        >
            <View style={{justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 20}}>아이디어 총 평점</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='grade' color='#FFC700' size={36}/>
                    <View style={{flexDirection: 'row', height: 32}}>
                        <Text style={{fontWeight: 'bold', fontSize: 32}}>4.0</Text>
                        <Text style={{color: '#919EAE', alignSelf: 'flex-end'}}>/5</Text>
                    </View>
                </View>
            </View>
            <Divider orientation='vertical' width={5} color='black'/>
            <View>
                <Rating type='실용성' rate='4.0' />
                <Rating type='창의성' rate='4.5' />
                <Rating type='가치성' rate='4.2' />
            </View>
        </View>
    )
}

export default IdeaOverallRating;