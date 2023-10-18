import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Hamburger_Icon from '../../../assets/hamburger_icon.svg';
import Change_Icon from '../../../assets/change_icon.svg';
import Three_Dots_Icon from '../../../assets/dotted_icon.svg';
import Coins_Icon from '../../../assets/coins_icon.svg';
import Speed_Icon from '../../../assets/speed_icon.svg';
import Share_Icon from '../../../assets/share_icon.svg';
import {useState} from 'react';

type propTypes = {
  selectedSpeedCallback: (data: string) => void,
  toggleBottomSheetCallback: () => void,
};
const Header = ({selectedSpeedCallback,toggleBottomSheetCallback}:propTypes) => {
  const [threeDotsExpanded, setThreeDotsExpanded] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState('1x');

  const handleSpeedSelection = (speed: string) => {
    setSelectedSpeed(speed);
    selectedSpeedCallback(speed);
    setThreeDotsExpanded(false);
  };

  const handleThreeDotsDropdown = () => {
    setThreeDotsExpanded(!threeDotsExpanded);
  };

  const handleShareButton = () => {
    setThreeDotsExpanded(false);
  };

  const handleChangeMantra = () => {
    toggleBottomSheetCallback();
  }
  
  const closeThreeDotsMenu = () => {
    setThreeDotsExpanded(false);
  };

  return (
    <>
      <View style={styles.parent}>
        <TouchableOpacity>
          <Hamburger_Icon width={35} height={35} />
        </TouchableOpacity>
        <Text style={styles.title}>Mantra</Text>
        <TouchableOpacity style={styles.roundedButton} onPress={handleChangeMantra}>
          <Change_Icon width={20} height={20} />
          <Text style={styles.roundedButtonText}>Change{'\n'}Mantra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundedButton}>
          <Coins_Icon width={20} height={20} />
          <Text style={styles.roundedButtonText}>2.43K</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={handleThreeDotsDropdown}>
          <Three_Dots_Icon width={20} height={20} />
        </TouchableOpacity>
      </View>

      {threeDotsExpanded && (
        <View style={styles.threeDotsDropdown}>
          <View style={styles.dropdownRow}>
            <Speed_Icon />
            <Text style={styles.threeDotsDropdownText}>Change Speed</Text>
          </View>
          {['0.5x', '1x', '1.25x', '1.5x', '2x'].map(speed => (
            <TouchableOpacity
              key={speed}
              style={[
                styles.dropdownRow,
                selectedSpeed === speed && {backgroundColor: 'white'},
                {width: '100 %'},
              ]}
              onPress={() => handleSpeedSelection(speed)}>
              <Text
                style={[
                  styles.threeDotsDropdownText,
                  selectedSpeed === speed && {color: 'black'},
                ]}>
                {speed}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              styles.dropdownRow,
              {
                height: 40,
                borderColor: 'rgba(111,111,111,1)',
                borderTopWidth: 1,
                width: '100 %',
                justifyContent: 'flex-start',
                alignItems: 'center',
              },
            ]}
            onPress={handleShareButton}
            >
            <Share_Icon style={{marginTop: 13}} />
            <Text style={styles.threeDotsDropdownText}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F5F5F5',
    marginTop: 15,
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#181818',
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Shadow color (black with 50% opacity)
    textShadowOffset: {width: 2, height: 2}, // Shadow offset (horizontal and vertical)
    textShadowRadius: 5, // Shadow radius
  },
  roundedButton: {
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EAEAEA',
    backgroundColor: '#FBFBFB',
    zIndex: 100,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    height: 36,
  },
  roundedButtonText: {
    fontSize: 11,
    color: '#181818',
    fontWeight: '600',
    marginLeft: 4,
  },
  roundButton: {
    borderRadius: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EAEAEA',
    backgroundColor: '#FBFBFB',
    zIndex: 100,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 5,
    height: 36,
    width: 36,
    borderWidth: 1,
    overflow: 'visible',
  },
  threeDotsDropdown: {
    position: 'absolute',
    display: 'flex',
    top: 55,
    right: 5,
    backgroundColor: 'rgba(44,44,44,0.8)',
    width: 200,
    height: 'auto',
    borderRadius: 4,
    paddingTop: 8,
  },
  threeDotsDropdownText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FBFBFB',
  },
  dropdownRow: {
    display: 'flex',
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingLeft: 16,
    height: 24,
  },
});


export default Header;
