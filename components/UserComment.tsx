import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const UserComment = ({user, comment, createdTime}) => {

    const { nickName, profileImageUrl } = user;

    const [ diffInMinites, setDiffInMinutes ] = useState();
    const [ time, setTime ] = useState();

    useEffect(() => {
        if(!createdTime) return;

        setDiffInMinutes(moment().diff(moment.unix(createdTime.seconds), 'minutes'));

        const interval = setInterval(() => { 
            setDiffInMinutes(moment().diff(moment.unix(createdTime.seconds), 'minutes'));
        }, 60000);

        return () => clearInterval(interval);
    }, [createdTime]);

    useEffect(() => {
        if(!diffInMinites) return ;
        console.log('diffInMinites', diffInMinites)

        let ret = diffInMinites;
        let unit = '분';
        if(ret > 60){
            ret = diffInMinites/60;
            unit = '시간';

            if(ret > 24){
                ret = ret / 24;
                unit = '일';

                if(ret > 30){
                    ret = ret / 30;
                    unit = '개월';

                    if(ret > 12){
                        ret=ret/12;
                        unit = '년';
                    }
                }
            }
        }

        setTime(`${ret|0}${unit} 전`);
    }, [diffInMinites]);

    return (
        <View style={{flexDirection: 'row', marginVertical: 16}}>
            <FastImage
                style={{width: 32, height: 32, borderRadius: 32}}
                source={profileImageUrl ? {uri: profileImageUrl} : require('assets/icons/person.png')}
            />
            <View style={{flex: 1, backgroundColor: '#eee', borderRadius: 10, padding: 8, marginLeft: 8}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: '#1D395F', fontWeight: '500'}}>{nickName}</Text>
                    <Text style={{color: '#333', marginTop: 4, fontSize: 10}}>{time}</Text>
                </View>
                <Text style={{color: '#333', marginTop: 4}}>{comment}</Text>
            </View>
        </View>
    )
}

export default UserComment;