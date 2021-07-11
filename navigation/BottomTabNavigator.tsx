/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { filter, size } from 'lodash';
import { View, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import Home from 'screens/Home';
import PickedIdeasScreen from 'screens/PickedIdeasScreen';
import IdeaScreen from 'screens/IdeaScreen';
import { Icon } from 'react-native-elements';
import UserProfileScreen from '../screens/UserProfileScreen';
import LikedIdeas from '../screens/UserProfile/LikedIdeas';
import RegisterdIdeas from '../screens/UserProfile/RegisterdIdeas';
import UserAccountSetting from '../screens/UserProfile/UserAccountSetting';
import NotificationScreen from '../screens/NotificationScreen';
import { useSelector } from 'react-redux';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const notifications = useSelector(state => state.user.userNotifications);
  const unreadNotificationCount = size(filter(notifications, notification => notification.unRead));

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="아이디어"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon size={30} type='material-community' name="lightbulb-on-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="마이페이지"
        component={UserProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="아림"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{position: 'relative'}}>
              <TabBarIcon name="notifications-outline" color={color} />
              {
                unreadNotificationCount > 0 &&
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: -10,
                    backgroundColor: 'red',
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{fontWeight: '900', color: 'white', textAlign: 'center'}}>{unreadNotificationCount}</Text>
                </View>
              }
            </View>
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Storybook',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <TabOneStack.Screen
        name="PickedIdeas"
        component={PickedIdeasScreen}
        options={{ headerShown: false }}
      />
      <TabOneStack.Screen
        name='Idea'
        component={IdeaScreen}
        options={{ headerShown: false }}
      />
      <TabOneStack.Screen
        name='Notification'
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const UserProfileStack = createStackNavigator<TabTwoParamList>();

function UserProfileNavigator() {
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
      <UserProfileStack.Screen
        name='LikedIdeas'
        component={LikedIdeas}
        options={{headerShown: false}}
      />
      <UserProfileStack.Screen
        name='RegisteredIdeas'
        component={RegisterdIdeas}
        options={{headerShown: false}}
      />
      <UserProfileStack.Screen
        name='UserAccountSetting'
        component={UserAccountSetting}
        options={{headerShown: false}}
      />
    </UserProfileStack.Navigator>
  );
}
