// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.

/*
import React from 'react';
import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
//import App from './App';
import AppWeb from './App';

SplashScreen.preventAutoHideAsync();

function IgniteApp() {
  return Platform.select({
    ios: () => {
      return <AppWeb hideSplashScreen={SplashScreen.hideAsync} />;
    },
    android: () => {
      return <AppWeb hideSplashScreen={SplashScreen.hideAsync} />;
    },
    web: () => {
      return <AppWeb hideSplashScreen={SplashScreen.hideAsync} />;
    },
  })();
}

if (Platform.OS !== 'web') {
  registerRootComponent(IgniteApp);
}

export default IgniteApp;
*/
import { AppRegistry, Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';
import { name as appName } from './app.json';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
if (Platform.OS == 'android') {
  registerRootComponent(App);
} else if (Platform.OS === 'web') {
  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('app'),
  });
} else {
  AppRegistry.registerComponent('main', () => App);
}
