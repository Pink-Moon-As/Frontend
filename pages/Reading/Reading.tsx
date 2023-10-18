import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Reading extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text>Reading</Text>
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