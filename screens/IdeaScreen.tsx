import * as React from 'react';
import { View, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import IdeaDetailScreen from './IdeaDetailScreen';
import { Icon } from 'react-native-elements';
import IdeaCommentScreen from './IdeaCommentScreen';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#1379FF'}}
    style={{backgroundColor: 'white'}}
    activeColor='#1379FF'
    inactiveColor='#334F74'
    labelStyle={{fontSize: 16}}
  />
)

export default function IdeaScreen({route, navigation}) {
  const layout = useWindowDimensions();

  const { idea } = route.params;
  if(!idea) return null;

  const renderScene = SceneMap({
    first: () => (<IdeaDetailScreen idea={idea} />),
    second: () => (<IdeaCommentScreen idea={idea} />),
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '아이디어 상세' },
    { key: 'second', title: '코멘트' },
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
            style={{
                paddingHorizontal: 20,
                paddingBottom: 12,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.pop()}
            >
                <Icon
                    name='arrow-back-ios'
                    color='black'
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.pop()}
            >
                <Icon
                    name='notifications-none'
                    color='black'
                />
            </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
    </SafeAreaView>
  );
}
