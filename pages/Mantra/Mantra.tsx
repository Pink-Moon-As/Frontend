import {Text, StyleSheet, View, SafeAreaView, ActivityIndicator} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import Header from './components/Header';
import BottomSheet from './components/BottomSheet';
import app from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {SvgUri} from 'react-native-svg';

export default function Mantra() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpeed, setSelectedSpeed] = useState('1x');
  const [svgURL, setSvgURL] = useState<string | null>(null);
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
  };
  useEffect(() => {
    const storageRef = storage().ref('/Backdrop/default_bd.svg');
    storageRef
      .getDownloadURL()
      .then(url => {
        setSvgURL(url);
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error getting SVG URL: ', error);
        setIsLoading(false)
      });
  }, []);

  if(isLoading){
    return (
      <SafeAreaView>
        <View style={[styles.parent,styles.parentLoading]}>
          <ActivityIndicator size='large' color='#E25E3E'/>
        </View>
      </SafeAreaView>
    )
  }  
  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <Header
          selectedSpeedCallback={updateSelectedSpeed}
          toggleBottomSheetCallback={toggleBottomSheet}
          isSheetOpen={openSheet}
        />
        {openSheet && <View style={styles.modal}></View>}
        {openSheet && (
          <BottomSheet openSheet={openSheet} onClose={closeBottomSheet} />
        )}
        <View style={styles.backdrop}>
          {svgURL ? (
            // Render the SVG using the SvgUri component from react-native-svg
            <SvgUri width="220" height="220" uri={svgURL} />
          ) : (
            <Text>Loading SVG...</Text>
          )}
        </View>
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
  backdrop:{
    top:100,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    width:'100 %'
  },
  parentLoading: {
    justifyContent: 'center',
    alignItems:'center'
  },
 
});
