import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import Header from './components/Header';
import BottomSheet from './components/BottomSheet';
import app from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {SvgUri} from 'react-native-svg';
import {MantraModel} from '../../models/Mantra';

export default function Mantra() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpeed, setSelectedSpeed] = useState('1x');
  const [backdropRef, setBackdropRef] = useState('/Backdrop/default_bd.svg')
  const [svgURL, setSvgURL] = useState<string | null>(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedMantraId, setSelectedMantraId] = useState<string | null>(null)
  const [thumbnailUrls, setThumbnailUrls] = useState<{[key: string]: string}>({});
  const [mantraList, setMantraList] = useState<{[key: string]: MantraModel}>({});
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

  const updateSelectedMatra = (id:string) => {
    setSelectedMantraId(id)
    setBackdropRef(mantraList[id].backdrop_ref)
  }
  useEffect(() => {
    const storageRef = storage().ref(backdropRef);
    storageRef
      .getDownloadURL()
      .then(url => {
        setSvgURL(url);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error getting SVG URL: ', error);
        setIsLoading(false);
      });
  }, [backdropRef]);

  useEffect(() => {
    const mantraCollection = firestore().collection('TblMantra');
    const subscriber = mantraCollection.onSnapshot(docs => {
      const tempMantraList: {[key: string]: MantraModel} = {};
      docs.forEach(doc => {
        const docData = doc.data();
        const mantraObject = new MantraModel(
          docData.id,
          docData.mantra_name,
          docData.mantra_owner,
          docData.audio_ref,
          docData.backdrop_ref,
          docData.thumbnail_ref,
          docData.lyrics,
        );
        // Use the id as the key
        tempMantraList[docData.id] = mantraObject;
      });
      setMantraList(tempMantraList);
      setIsLoading(isLoading && false);
    });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const fetchUrls = async () => {
      const urls: {[key: string]: string} = {};
      for (const id in mantraList) {
        if (mantraList.hasOwnProperty(id)) {
          try {
            const url = await getUrl(mantraList[id].thumbnail_ref);
            urls[id] = url;
          } catch (error) {
            console.error('Error getting SVG URL: ', error);
          }
        }
      }
      setThumbnailUrls(urls);
      setIsLoading(isLoading && false);
    };
    fetchUrls();
  }, [mantraList]);

  async function getUrl(ref: string): Promise<string> {
    const storageRef = storage().ref(ref);
    return storageRef
      .getDownloadURL()
      .then(url => {
        return url;
      })
      .catch(error => {
        console.error('Error getting SVG URL: ', error);
        return '';
      });
  }

  if (isLoading) {
    return (
      <SafeAreaView>
        <View style={[styles.parent, styles.parentLoading]}>
          <ActivityIndicator size="large" color="#E25E3E" />
        </View>
      </SafeAreaView>
    );
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
          <BottomSheet
            openSheet={openSheet}
            toggleBottomSheetCallback={toggleBottomSheet}
            onClose={closeBottomSheet}
            mantraList={mantraList}
            thumbnailUrls={thumbnailUrls}
            updateSelectedMatraCallback={updateSelectedMatra}
          />
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
  backdrop: {
    top: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100 %',
  },
  parentLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
