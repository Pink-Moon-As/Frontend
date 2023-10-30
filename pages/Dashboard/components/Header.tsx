import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Hamburger_Icon from '../../../assets/hamburger_icon.svg';

const Header = () => {
  return (
    <>
      <View style={styles.parent}>
        <View style={styles.leftContainer}>
          <TouchableOpacity>
            <Hamburger_Icon width={35} height={35} />
          </TouchableOpacity>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.roundedButtonText}>Today</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#181818',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginLeft: 15, // Add a margin to separate text from the icon
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    shadowOffset: { width: 4, height: 4 },
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
});

export default Header;
