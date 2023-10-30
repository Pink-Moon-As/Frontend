import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { checkVerification } from '../../api/verify';
import { useRoute } from '@react-navigation/native';
import { NavigationProp, RouteProp, CommonActions } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OtpScreenProps {
  navigation: NavigationProp<any>; // Use the correct type for your navigation stack
}
type RootStackParamList = {
  LoginScreen: undefined;
  OTPScreen: { phoneNumber: string };
};
function OTPScreen({navigation}:OtpScreenProps){
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formattedOtp, setFormattedOtp] = useState("");
  const otpInputs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
  const [invalidCode, setInvalidCode] = useState(false);
  const [userId, setUserId] = useState('');

  const handleOtpChange = (text: string, index: number) => {
    if (text && index < otpInputs.length - 1) {
      otpInputs[index + 1].current?.focus();
    } else if (!text && index > 0) {
      otpInputs[index - 1].current?.focus();
    }
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    const joinedOtp = otp.join('');
    setFormattedOtp(joinedOtp);
  };

  const route = useRoute<RouteProp<RootStackParamList, 'OTPScreen'>>();
  const { phoneNumber } = route.params;
  
  const handleOtpSubmit = () => {
    // Handle OTP input and navigation logic here
    const joinedOtp = otp.join('');
    setFormattedOtp(joinedOtp);
    // checkVerification(phoneNumber, formattedOtp).then((success) => {
    //   if (!success) setInvalidCode(true);
      handleLogin(phoneNumber)
    // });
  };

  const handleLogin = async (phone_number:string) => {
    try {
      const collectionRef = firestore().collection('TblUsers');
      const querySnapshot = await collectionRef.where('phone_num', '==', phone_number).get();
  
      if (!querySnapshot.empty) {
        const documentId = querySnapshot.docs[0].id;
        setUserId(documentId);
        await collectionRef.doc(documentId).update({
          isSignedIn: true,
        });
        storeUserIdInLocalStorage();
      }
    } catch (error) {
      console.error('Error fetching document by phone number:', error);
      return null;
    }
  };
  const storeUserIdInLocalStorage = async() => {
    try {
      await AsyncStorage.setItem('userId', userId);
      console.log('Document ID stored in local storage.',userId);
    } catch (error) {
      console.error('Error storing document ID:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            ref={otpInputs[index]}
          />
        ))}
      </View>
      {invalidCode && <Text style={styles.error}>Incorrect code</Text>}
      <Button title="Submit" onPress={handleOtpSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
  },
  error: {
    color: "red",
  },
});

export default OTPScreen;
