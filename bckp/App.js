import React, { createRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionSheet from "react-native-actions-sheet";
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from './styles/globalStyles';
import ChatPage from './Screens/ChatPage';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarStyleOptions = {
  borderTopWidth: 0,
  height: 55,
  elevation: 0,
}

export default function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator screenOptions={{
        "tabBarShowLabel": false,
        tabBarActiveTintColor: '#006aee',
        tabBarStyle: tabBarStyleOptions
      }}>
        <Tab.Screen name="HomeInit"
          component={HomeInit}
          options={{
            headerShown: false,
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <View style={globalStyles.flexCenterColumn}>
                <Icon name='chatbubble' color={color} size={25} />
                <Text style={{ color: color }}>Chats</Text>
              </View>
            ),
          }}
        />

        <Tab.Screen name="Stats"
          component={Stats}
          options={{
            headerShown: false,
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <View style={globalStyles.flexCenterColumn}>
                <Icon name='ios-timer' color={color} size={25} />
                <Text style={{ color: color }}>Status</Text>
              </View>
            ),
          }}
        />

        <Tab.Screen name="People"
          component={People}
          options={{
            headerShown: false,
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <View style={globalStyles.flexCenterColumn}>
                <Icon name='ios-people' color={color} size={25} />
                <Text style={{ color: color }}>People</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

function HomeInit({ navigation, route }) {

  // useEffect(() => {
  //   navigation.setOptions({
  //     tabBarStyle: {
  //       display: 'none'
  //     }
  //   })
  // }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={HomePage}
        name='HomePage'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={SearchPage}
        name='SearchPage'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={ChatPage}
        name='ChatPage'
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function HomePage({ navigation }) {
  const actionSheetRef = createRef();
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.appBar}>
        <View style={globalStyles.flex}>
          <View style={globalStyles.appBarAvatar}></View>
          <Text style={globalStyles.appBarTitle}>Signal v2</Text>
        </View>

        <View style={globalStyles.flex}>
          <TouchableOpacity><Icon name='ios-notifications' size={25} /></TouchableOpacity>
          <View style={globalStyles.space30}></View>
          <TouchableOpacity onPress={() => { navigation.navigate(SearchPage) }}><Icon name='search' size={25} /></TouchableOpacity>
        </View>
      </View>

      <View style={globalStyles.space10}></View>

      <ScrollView>
        <Card name='Elon musk' username='eel.on.musk_' />
        <Card name='Jimmy Falon' username='jimbo_' />
        <Card name='Elon musk' username='eel.on.musk_' />
      </ScrollView>

      <TouchableOpacity style={globalStyles.fab} onPress={() => { actionSheetRef.current?.setModalVisible(); }}><Icon name='md-pencil-sharp' color='#fff' size={30} /></TouchableOpacity>

      <ActionSheet
        gestureEnabled={true}
        bounceOnOpen={true}
        openAnimationSpeed={10}
        bounciness={5}
        defaultOverlayOpacity={0.1}
        ref={actionSheetRef}
        containerStyle={globalStyles.bottomSheet}
        indicatorColor={'#ccc'}>

        <View style={{ paddingBottom: 40 }}>
          <ScrollView>
            <TextInput style={globalStyles.inputBox} placeholder='Search for user' />

            <Card name='Elon musk' username='eel.on.musk_' />
            <Card name='Jimmy Falon' username='jimbo_' />
            <Card name='Elon musk' username='eel.on.musk_' />
            <Card name='Jimmy Falon' username='jimbo_' />
            <Card name='Elon musk' username='eel.on.musk_' />
            <Card name='Elon musk' username='eel.on.musk_' />
            <Card name='Jimmy Falon' username='jimbo_' />
            <Card name='Elon musk' username='eel.on.musk_' />
          </ScrollView>
        </View>
      </ActionSheet>
    </View>
  )
}

function Card(props) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => { navigation.navigate(ChatPage) }}>
      <View style={globalStyles.userCard}>
        <View style={globalStyles.userAvatar}></View>
        <View>
          <Text style={[globalStyles.userCardTitle, globalStyles.boldText]}>{props.name}</Text>
          <Text style={globalStyles.greyText}>{props.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function Stats() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.appBar}>
        <View style={globalStyles.flex}>
          <View style={globalStyles.appBarAvatar}></View>
          <Text style={globalStyles.appBarTitle}>Status</Text>
        </View>

        <View style={globalStyles.flex}>
          <TouchableOpacity><Icon name='ios-notifications' size={25} /></TouchableOpacity>
          <View style={globalStyles.space30}></View>
          <TouchableOpacity><Icon name='search' size={25} /></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

function SearchPage({ navigation }) {

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.appBar}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}><Icon name='ios-arrow-back-outline' color='#006aee' size={25} /></TouchableOpacity>
        <TextInput autoFocus={true} style={[globalStyles.inputBox, globalStyles.searchInputBox]} placeholder='Search' />
      </View>
    </SafeAreaView>
  )
}

function People() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.appBar}>
        <View style={globalStyles.flex}>
          <View style={globalStyles.appBarAvatar}></View>
          <Text style={globalStyles.appBarTitle}>People</Text>
        </View>

        <View style={globalStyles.flex}>
          <TouchableOpacity><Icon name='ios-notifications' size={25} /></TouchableOpacity>
          <View style={globalStyles.space30}></View>
          <TouchableOpacity><Icon name='search' size={25} /></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}