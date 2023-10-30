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
import OTPScreen from './pages/LoginAndSignup/OTPScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [userId, setUserId] = useState<string | null>('XNEz6Eq6peP65FRCCpyy');

  const getDocumentIdFromLocalStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId)
      console.log(userId,"Hello")
      return storedUserId;
    } catch (error) {
      console.error('Error retrieving document ID:', error);
      return null;
    }
  };

  useEffect(() => {
    // Load the userId from local storage
    getDocumentIdFromLocalStorage();
    if (userId == '') { return }
    const collectionRef = firestore().collection('TblUsers');
    const documentRef = collectionRef.doc(userId?.toString());

    const unsubscribe = documentRef.onSnapshot((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        if (data && data.isSignedIn !== undefined) {
          setIsSignedIn(data.isSignedIn);
        }
      }
    });
    return () => {
      unsubscribe();
    };


  }, []);



  return (
    <NavigationContainer>
      {isSignedIn ? (
        <NavHolder />
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
