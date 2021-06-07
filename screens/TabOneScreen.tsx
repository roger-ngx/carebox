import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import functions from '@react-native-firebase/functions';


import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {

  useEffect(() => {
    // functions().httpsCallable('helloWorld')().then(res => console.log(res.data));
    signInWithKakao();
  }, [])

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    console.log(token);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
