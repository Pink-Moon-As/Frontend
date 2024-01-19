/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import NavHolder from './pages/Holder/NavHolder';
import Login from './pages/LoginAndSignup/Login';
import Signup from './pages/LoginAndSignup/Signup';
import Splash from './pages/SplashScreen/Splash';
import OTPScreen from './pages/LoginAndSignup/OTPScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App(): JSX.Element {
 

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Splash" component={Splash}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="NavHolder" component={NavHolder} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
