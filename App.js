import React from "react"
import { NavigationContainer,DefaultTheme } from "@react-navigation/native"
import AppNavigator from "./app/navigation/AppNavigator"
import AudioProvider from "./app/context/AudioProvider"
import { View } from "react-native"
import AudioListItem from "./app/components/AudioListItem"
import color from "./app/misc/color"

const MyTheme ={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: color.APP_BG,
  }
}

export default function App() {
  return (
  <AudioProvider>
  <NavigationContainer theme={MyTheme}>
    <AppNavigator/>
  </NavigationContainer>
  </AudioProvider>
  );
 
}


