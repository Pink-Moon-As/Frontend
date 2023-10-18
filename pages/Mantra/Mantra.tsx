import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import React, {Component, useState} from 'react';
import Header from './components/Header';
import BottomSheet from './components/BottomSheet';

export default function Mantra() {
  const [selectedSpeed, setSelectedSpeed] = useState('1x');
  const [openSheet, setOpenSheet] = useState(false);
  const updateSelectedSpeed = (speed: string) => {
    setSelectedSpeed(speed);
  };

  const toggleBottomSheet = () => {
    setOpenSheet(!openSheet);
  };

  const closeBottomSheet = () => {
    setTimeout(() => {
      setOpenSheet(false);
    }, 500);
  }
  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <Header
          selectedSpeedCallback={updateSelectedSpeed}
          toggleBottomSheetCallback={toggleBottomSheet}
        />
        {openSheet && <View style={styles.modal}></View>}
        {openSheet && <BottomSheet openSheet={openSheet} onClose={closeBottomSheet} />}
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F5F5F5',
    fontSize: 30,
    height: '100%',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    // backgroundColor:'rgba(0,0,0,0.5)'
  },
});
