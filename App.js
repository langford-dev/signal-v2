import React, { createRef, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ActionSheet from "react-native-actions-sheet";
// import Icon from 'react-native-vector-icons/Ionicons';
// import globalStyles from './styles/globalStyles';
import ChatPage from './screens/ChatPage';
import ProfilePage from './screens/ProfilePage';
import ContactsPage from './screens/ContactsPage';
// import storage from './storage/storage';
import InputPhoneNumber from './screens/auth/InputPhoneNumber';
import { initializeApp } from 'firebase/app';
import HomeScreen from './screens/HomeScreen';
import OTP from './screens/auth/OTP';

const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

initializeApp(firebaseConfig);

// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });


// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Jay Shmurda:",
//       body: 'Langford is the coolest dude 😎😇👋',
//       sound: true,
//       color: '#006aee'
//     },
//     trigger: { seconds: 2 },
//   });
// }


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarStyleOptions = {
  borderTopWidth: 0,
  height: 55,
  elevation: 0,
}

export default function App() {

  // Alert.alert(
  //   'Alert Title',
  //   'My Alert Msg',
  //   [
  //     { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     { text: 'OK', onPress: () => console.log('OK Pressed') },
  //   ],
  //   { cancelable: false },
  // );

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        component={InputPhoneNumber}
        name='InputPhoneNumber'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={OTP}
        name='OTP'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={ContactsPage}
        name='ContactsPage'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={HomeScreen}
        name='HomeScreen'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={ProfilePage}
        name='ProfilePage'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={ChatPage}
        name='ChatPage'
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
}

// const HomeInit = ({ navigation, route }) => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         component={HomePage}
//         name='HomePage'
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         component={SearchPage}
//         name='SearchPage'
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         component={ProfilePage}
//         name='ProfilePage'
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         component={ChatPage}
//         name='ChatPage'
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   )
// }