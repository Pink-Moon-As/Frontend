import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import React, { Component,useState } from 'react'
import Header from './components/Header'


export default function Mantra () {
 const [selectedSpeed, setSelectedSpeed] = useState('1x');
 const updateSelectedSpeed = (speed:string) => {
  setSelectedSpeed(speed);
 }
 
  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <Header selectedSpeedCallback={updateSelectedSpeed}/>
        <Text>Mantra</Text>
      </View>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  parent:{
    backgroundColor:'#F5F5F5',
    fontSize:30,
    height:'100%'
  }
})