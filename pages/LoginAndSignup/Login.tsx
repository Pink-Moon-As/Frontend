import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { sendSmsVerification } from '../../api/verify'
import axios from 'axios';


interface LoginScreenProps {
  navigation: NavigationProp<any>; // Use the correct type for your navigation stack
}

function LoginScreen({navigation}:LoginScreenProps){
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = () => {
    // Implement your OTP sending logic here.
    if(phoneNumber.length<10){
      return;
    }
    const sendOtpUrl ="http://localhost:3000/sendOtp"
    const login_flag = true;
    const data = {
      phone_num:phoneNumber,
      login_flag:login_flag
    }
    axios.post(sendOtpUrl,data)
    .then(function (response) {
      if(response.data.success){
        console.log(response)
        navigation.navigate('OTPScreen',{phoneNumber:phoneNumber,login_flag:true})
      }
      else{
        console.log(response, "Some error occured in sending the otp")
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Number Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <Button title="Send OTP" onPress={handleSendOTP} 

      />
      <TouchableOpacity
       onPress={() => navigation.navigate('Signup')}
     
       >
        <Text style={styles.signupLink}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  signupLink: {
    textAlign: 'center',
    marginTop: 20,
    color: 'blue',
  },
});

export default LoginScreen;
