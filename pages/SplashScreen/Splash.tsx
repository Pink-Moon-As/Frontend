import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

interface SplashScreenProps {
  navigation: NavigationProp<any>; // Use the correct type for your navigation stack
}
const Splash = ({navigation}:SplashScreenProps)=>{
  
  const [authToken, setAuthToken] = useState<string|null>()
  useEffect(() => {
    const getAuthTokenFromLocalStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        setAuthToken(token);
        console.log(token,"auth token")
        return token;
      } catch (error) {
        console.error('Error retrieving auth token:', error);
        return null;
      }
    };
    getAuthTokenFromLocalStorage();
  }, []);

  useEffect(() => {
    const delay = 2000; // 2 seconds (2000 milliseconds)
  
    const timeoutId = setTimeout(() => {
      if (authToken) {
        navigation.navigate('NavHolder');
      } else {
        navigation.navigate('Login');
      }
    }, delay);
  
    return () => {
      // Clear the timeout if the component unmounts before the 2 seconds elapse
      clearTimeout(timeoutId);
    };
  }, [authToken]);
  



  return (
    <View>
      <Text>
        Chanting App
      </Text>
    </View>
  )
}
export default Splash;