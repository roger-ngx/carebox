/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useSelector, RootStateOrAny } from 'react-redux';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SplashScreen from 'screens/SplashScreen';
import LoginWithPhoneNumber from '../screens/Login/LoginWithPhoneNumber';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  console.log('auth', auth);

  if(auth.isLoading){
    return <SplashScreen />
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        !!auth.authToken ?
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        :
        // <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Login" component={LoginWithPhoneNumber} />
      }
    </Stack.Navigator>
  );
}
