/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/Home';
import TabTwoScreen from 'screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import LinksScreen from 'screens/LinksScreen';
import Home from 'screens/Home';
import IdeaDetailScreen from 'screens/IdeaDetailScreen';
import PickedIdeasScreen from 'screens/PickedIdeasScreen';
import IdeaScreen from 'screens/IdeaScreen';
import { Icon } from 'react-native-elements';
import UserProfileEdit from '../screens/UserProfileEdit';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

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
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Storybook',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
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
    </TabOneStack.Navigator>
  );
}

const UserProfileStack = createStackNavigator<TabTwoParamList>();

function UserProfileNavigator() {
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name="TabTwoScreen"
        component={UserProfileEdit}
        options={{ headerShown: false }}
      />
    </UserProfileStack.Navigator>
  );
}
