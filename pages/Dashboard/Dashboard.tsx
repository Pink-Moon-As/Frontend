import React from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import Header from './components/Header';

const Dashboard = () => {
  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <Header />
        <View style={styles.contentContainer}>

        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F5F5F5',
    fontSize: 30,
    height: '100%',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'absolute',
    width: '100 %',
    height: '100 %',
    top: 51,
    alignItems: 'center',
  }
});

export default Dashboard;
