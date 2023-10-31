import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import Header from './components/Header';
import Calendar from './components/CalendarComponent';
import Coins_Icon from '../../assets/coins_icon.svg';
import Mantra_Icon from '../../assets/mantra_icon.svg';
import Reading_Icon from '../../assets/reading_icon.svg';
import Bhajan_Icon from '../../assets/bhajan_icon.svg';
import Chart from './components/Chart'

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.parent}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Calendar />
        <View style={styles.statsContainer}>
          <View style={[styles.statsContainerRow, { marginRight: 10 }]}>
            <View style={styles.statsBlock}>
              <Coins_Icon />
              <Text style={styles.statsText}>Coins Earned</Text>
            </View>
            <View style={styles.statsBlock}>
              <Mantra_Icon stroke="#E25E3E" fill="#FFFFFF" strokeWidth={2} />
              <Text style={styles.statsText}>23 times Chanting</Text>
            </View>
          </View>
          <View style={[styles.statsContainerRow, { marginRight: 10 }]}>
            <View style={styles.statsBlock}>
              <Bhajan_Icon stroke='#E25E3E' />
              <Text style={styles.statsText}>1 hrs of Bhajan</Text>
            </View>
            <View style={styles.statsBlock}>
              <Reading_Icon fill="#E25E3E" />
              <Text style={styles.statsText}>4 hrs of Reading</Text>
            </View>
          </View>
        </View>
        <Chart/>
      </ScrollView>
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
    alignItems: 'center',
  },
  statsContainer: {
    width: '100%',
    marginTop: 10,
  },
  statsContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  statsBlock: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#EAEAEA',
    height: 50,
    flex: 0.49,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  statsText: {
    maxWidth: 122,
    color: '#010101',
    fontWeight: '500',
    fontSize: 13,
  },
});

export default Dashboard;
