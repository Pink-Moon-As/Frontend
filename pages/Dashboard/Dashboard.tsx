import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text>Dashboard</Text>
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  parent:{
    backgroundColor:'rgb(255,255,255)',
    fontSize:30,
    height:'100%'
  }
})