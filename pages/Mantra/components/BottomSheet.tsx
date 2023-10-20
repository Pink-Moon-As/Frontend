import React, {useRef,useEffect} from 'react';
import {View,StyleSheet,Text,Animated,PanResponder} from 'react-native';
import { sizes } from '../../../constants/theme';

type propTypes = {
  openSheet: boolean;
  onClose: () => void;
};

const screenHeight = sizes.height;
const sheetHeight = sizes.height/1.4 ;

export default function BottomSheet({ openSheet, onClose }: propTypes) {
  const position = useRef(new Animated.Value(screenHeight)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          position.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: () => {
        Animated.spring(position, {
          toValue: sheetHeight,
          useNativeDriver: false,
        }).start();
        onClose();
      },
    })
  ).current;

  useEffect(() => {          
    if (openSheet) {
      Animated.spring(position, {
        toValue:  20,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(position, {
        toValue: sheetHeight,
        useNativeDriver: false,
      }).start();
    }
  }, [openSheet]);

  const animatedStyle = {
    transform: [{ translateY: position }],
  };

  return (

    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, animatedStyle]} >
        <View style={styles.sheetHandleViewContainer} {...panResponder.panHandlers}>
          <View style={[styles.sheetHandleView]}  />
        </View>
        
        <View style={styles.sheetContentContainer}>
          <Text>Your Bottom Sheet Content</Text>
        </View>
      </Animated.View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    zIndex:100
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(44, 44, 44, 0.85)',
    paddingHorizontal: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: sheetHeight,
  },
  sheetHandleView: {
    width: 95,
    height: 6,
    backgroundColor: '#E7E7E7',
    borderColor: '#000000',
    borderRadius: 20,
    alignSelf: 'center',
  },
  sheetContentContainer: {
    marginTop: 8,
  },
  sheetHandleViewContainer:{
    width:'auto',
    paddingTop:10
  }
});



