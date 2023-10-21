import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import Header from './components/Header';
import BottomSheet from './components/BottomSheet';
import app from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {SvgUri} from 'react-native-svg';
import {MantraModel} from '../../models/Mantra';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import * as Progress from 'react-native-progress';
import Play_Icon from '../../assets/play_icon.svg';
import Pause_Icon from '../../assets/pause_icon.svg'
import Sound from 'react-native-sound';
import CircularProgress from '../../components/CircularProgress';

export default function Mantra() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpeed, setSelectedSpeed] = useState('1x');
  const [backdropSize, setBackdropSize] = useState(220);
  const [backdropRef, setBackdropRef] = useState('/Backdrop/default_bd.svg');
  const [audioRef, setAudioRef] = useState<string>('');
  const [svgURL, setSvgURL] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [openSheet, setOpenSheet] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMantraId, setSelectedMantraId] = useState<string | null>(null);
  const [soundObject, setSoundObject] = useState<Sound | null>(null);
  const [currentLoopCount, setcurrentLoopCount] = useState(0);
  const [totalLoopCount, setTotalLoopCount]=useState(108);
  const [thumbnailUrls, setThumbnailUrls] = useState<{[key: string]: string}>(
    {},
  );
  const [mantraList, setMantraList] = useState<{[key: string]: MantraModel}>(
    {},
  );
  const [progressIndicatorValue, setProgressIndicatorValue] = useState(0);

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

  const updateSelectedMatra = (id: string) => {
    setSelectedMantraId(id);
    setBackdropRef(mantraList[id].backdrop_ref);
    setBackdropSize(150);
    setAudioRef(mantraList[id].audio_ref);
  };

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
    if (audioRef == '') return;
    const storageRef = storage().ref(audioRef);
    storageRef
      .getDownloadURL()
      .then(url => {
        setAudioUrl(url);
      })
      .catch(error => {
        console.error('Error getting Audio URL: ', error);
      });
  }, [audioRef]);

  useEffect(() => {
    if (audioUrl == '') return;
    const so = new Sound(
      audioUrl,
      Platform.OS === 'ios' ? '' : encodeURIComponent(Sound.DOCUMENT),
      error => {
        if (error) {
          console.error('Error loading sound: ', error);
          return;
        } else {
          // playAudio();
          setSoundObject(so);
        }
      },
    );
  }, [audioUrl]);

  useEffect(() => {
    const numericSpeed = parseFloat(selectedSpeed.split('x')[0]);
    soundObject?.setSpeed(numericSpeed);
  }, [selectedSpeed]);
  
  const playAudio = () => {
    if (soundObject) {
      soundObject.play(success => {
        if (success) {
          setcurrentLoopCount(currentLoopCount+1);
          console.log('Audio played successfully');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        setIsPlaying(false);
      });
    }
  };

  
  const togglePlayback = () => {
    if (!soundObject) {
      return;
    }
    if (isPlaying) {
      soundObject.pause();
      setIsPlaying(false);
    } else if(currentLoopCount<totalLoopCount) {
      setIsPlaying(true);
      playAudio();
    }
    else if(currentLoopCount>=totalLoopCount){
      setcurrentLoopCount(0);
      setIsPlaying(true);
      playAudio();
    }
  };
  useEffect(() => {
   setProgressIndicatorValue(currentLoopCount/totalLoopCount)
  }, [currentLoopCount,totalLoopCount])
  

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
            selectedMantraId={selectedMantraId}
          />
        )}
        <View style={styles.contentContainer}>
          <View style={styles.backdrop}>
            {svgURL ? (
              // Render the SVG using the SvgUri component from react-native-svg
              <SvgUri width={backdropSize} height={backdropSize} uri={svgURL} />
            ) : (
              <Text>Loading SVG...</Text>
            )}
          </View>

          {selectedMantraId != null && (
            <View style={styles.mantraSelectedContainer}>
              <View style={styles.lyricsContainer}>
                <Text style={styles.lyricsText}>
                  {selectedMantraId != null &&
                    mantraList[selectedMantraId].lyrics}
                </Text>
              </View>

              <View style={styles.progressContainer}>
                <CircularProgress radius={120} progress={progressIndicatorValue} />
                <View style={styles.playIconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      togglePlayback();
                    }}>
                    {  !isPlaying ?
                    <Play_Icon style={{zIndex: 1}} /> :
                    <Pause_Icon style={{zIndex: 1}}/>
                    }
                  </TouchableOpacity>
                  {currentLoopCount!=0 &&
                    <Text style={styles.loopCountText}>{currentLoopCount}/{totalLoopCount}</Text>}

                </View>
              </View>
            </View>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100 %',
    marginTop: 40,
  },
  parentLoading: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  lyricsContainer: {
    marginTop: 10,
    height: 120,
    overflow: 'scroll',
  },
  lyricsText: {
    color: 'rgba(51, 51, 51, 1)',
    fontWeight: '600',
    fontSize: 24,
    overflow: 'scroll',
  },
  mantraSelectedContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100 %',
    height: '100 %',
    marginTop: 20,
    alignItems: 'center',
  },
  progressContainer: {
    width: '100 %',
    flex: 1,
    alignItems: 'center',
  },
  playIconContainer: {
    position: 'absolute',
    top: 91,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loopCountText:{
    color:'rgba(228, 104, 74, 1)',
    fontWeight:'600',
    fontSize:19,
    marginTop:10
  }
});
