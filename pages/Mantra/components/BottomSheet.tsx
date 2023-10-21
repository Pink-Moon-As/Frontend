import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  PanResponder,
  TextInput,
  FlatList,
} from 'react-native';
import {sizes} from '../../../constants/theme';
import {MantraModel} from '../../../models/Mantra';
import Search_Icon from '../../../assets/search_icon.svg';
import { BlurView } from "@react-native-community/blur";
import {SvgUri} from 'react-native-svg';
import Music_Icon from '../../../assets/music_icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Small_Play_Icon from '../../../assets/small_play_icon.svg'
type propTypes = {
  openSheet: boolean;
  toggleBottomSheetCallback: () => void;
  onClose: () => void;
  mantraList: {[key: string]: MantraModel}
  thumbnailUrls:{ [key: string]: string }
  updateSelectedMatraCallback: (data: string) => void;
  selectedMantraId:string|null
};

const screenHeight = sizes.height;
const sheetHeight = sizes.height / 1.4;

export default function BottomSheet({
  openSheet,
  onClose,
  mantraList,
  thumbnailUrls,
  updateSelectedMatraCallback,
  toggleBottomSheetCallback,
  selectedMantraId
}: propTypes) {
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
    }),
  ).current;

  useEffect(() => {
    if (openSheet) {
      Animated.spring(position, {
        toValue: 20,
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
    transform: [{translateY: position}],
  };

  const handleMantraRowClick = (id:string) => {
    toggleBottomSheetCallback();
    updateSelectedMatraCallback(id)
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        <BlurView
        blurType="dark"
        blurAmount={6}
        style={styles.blurView}
        reducedTransparencyFallbackColor="rgb(0,0,0)"
        >
          
          <View
            style={styles.sheetHandleViewContainer}
            {...panResponder.panHandlers}>
            <View style={[styles.sheetHandleView]} />
          </View>

          <View style={styles.sheetContentContainer}>
            <View style={styles.searchBarContainer}>
              <Search_Icon width={20} height={20}/>
              <TextInput
                style={styles.searchBar}
                placeholder="Search for mantra, god or singer"
                placeholderTextColor="rgb(152,152,152)"
              />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={Object.values(mantraList)}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.mantraRow} onPress={()=>handleMantraRowClick(item.id)}>
                    <View style={styles.mantraThumbnail}>
                      <Music_Icon width={42} height={42} stroke={'rgb(255,255,255)'} style={{position:'absolute'}}/>
                      <SvgUri width={42} height={42} uri={thumbnailUrls[item.id]} fallback={<Music_Icon/>} />
                    </View>
                    <View style={styles.matraRowVertical}>
                      <Text style={[styles.mantraText,{fontWeight:'600',fontSize:16}]}>{item.mantra_name}</Text>
                      <Text style={[styles.mantraText,{fontWeight:'400',fontSize:14}]}>{item.mantra_owner}</Text>
                    </View>
                    <Small_Play_Icon/>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
       
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    zIndex: 100,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(44, 44, 44, 0.8)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor:'rgba(0,0,0,1)',
    height: sheetHeight,
    zIndex:25
    
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
  sheetHandleViewContainer: {
    width: 'auto',
    paddingTop: 10,
  },
  searchBarContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(255,255,255)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderColor:'rgba(197, 197, 197, 1)'
  },
  searchBar: {
    color: '#181818',
    fontSize: 14,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  listContainer: {},
  mantraRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20
  },
  matraRowVertical:{
    flex:1,
    height:42,
    marginLeft:20,
    flexDirection:'column',
    justifyContent:'space-around'
  },
  mantraText:{
    color:'rgb(255,255,255)',
  },
 blurView:{
    width:'100 %',
    height:'100 %',
    paddingHorizontal: 22,
    borderRadius:25,
    borderColor:'rgba(0,0,0,0)',
 },
 mantraThumbnail:{
  height:42,
  width:42,
 }
});
