import "react-native-gesture-handler"
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { 
  createStackNavigator, 
  TransitionSpecs, 
  TransitionPresets, 
  CardStyleInterpolators  
} from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import { LogBox } from "react-native";
import ChatScreen from "./screens/ChatScreen";
// import _ from 'lodash';


const Stack = createStackNavigator();



LogBox.ignoreLogs(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message);
//   }
// };

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="inverted" />
      <Stack.Navigator 
        screenOptions={{
          headerMode: "float",
          ...TransitionPresets.SlideFromRightIOS
          // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          // transitionSpec: {
          //   open: TransitionSpecs.TransitionIOSSpec,
          //   close: TransitionSpecs.TransitionIOSSpec,
          // }
        }}
      >
        <Stack.Screen options={{
          title: 'Login',
          headerTitleAlign: 'center'
        }} name="Login" component={LoginScreen}/>

        <Stack.Screen options={{
          title: 'Register',
          headerTitleAlign: 'center'
        }} name="Register" component={RegisterScreen}/>
      
        <Stack.Screen options={{
          title: 'Home',
          headerTitleAlign: 'center'
        }} name="Home" component={HomeScreen}/>

        <Stack.Screen options={{
          title: 'New chat',
          headerTitleAlign: 'center'
        }} name="AddChat" component={AddChatScreen}/>

        <Stack.Screen options={{
          headerTitleAlign: 'center'
        }} name="Chat" component={ChatScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
