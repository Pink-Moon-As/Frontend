import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Header from './components/Header';
import Calendar from './components/CalendarComponent';
import Coins_Icon from '../../assets/coins_icon.svg';
import Mantra_Icon from '../../assets/mantra_icon.svg';
import Reading_Icon from '../../assets/reading_icon.svg';
import Bhajan_Icon from '../../assets/bhajan_icon.svg';
import Chart from './components/Chart'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface MonthlyStats {
  [key: string]: number;
}

const Dashboard = () => {
  const [currentMonthStats, setCurrentMonthStats] = useState<MonthlyStats>({});
  const [currentSelectedDate, setCurrentSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentChantingCount, setCurrentChantingCount] = useState(0)
  useEffect(() => {
    setCurrentChantingCount(Math.floor(currentMonthStats[currentSelectedDate]/108))
  }, [currentSelectedDate])
  
  const changeCurrentSelectedDate = (date:string)=>{
    setCurrentSelectedDate(date);
  }
 
  const [streak, setStreak] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const type = "Chanting"
  useEffect(() => {
    const fetchData = async() =>{
      const url = "http://localhost:3000/get_dashboard_data"
      
      const token = await AsyncStorage.getItem('auth_token')
      const data = {
        type:type
      }
      console.log(token)
      const headers = {
        Authorization: `Bearer ${token}`, 
      };
      const res = await axios.post(url,data,{headers})
      setCurrentMonthStats(res.data['userData'])
      setCurrentChantingCount(Math.floor(res.data['userData'][currentSelectedDate]/108))
      // console.log(res.data)
      setStreak(res.data['chantingStreak'])
      setIsLoading(false);
    }
    
    
    fetchData();
    


  }, [])
  
  return (
    <SafeAreaView style={styles.parent}>
      <Header />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E25E3E" />
        </View>
      ) :
     ( <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Calendar streak={streak} currentMonthStats={currentMonthStats} handleDateChange={changeCurrentSelectedDate}/>
        <View style={styles.statsContainer}>
          <View style={[styles.statsContainerRow, { marginRight: 10 }]}>
            <View style={styles.statsBlock}>
              <Coins_Icon />
              <Text style={styles.statsText}>Coins Earned</Text>
            </View>
            <View style={styles.statsBlock}>
              <Mantra_Icon stroke="#E25E3E" fill="#FFFFFF" strokeWidth={2} />
              <Text style={styles.statsText}>{currentChantingCount?currentChantingCount:0} rounds Chanting</Text>
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
        <Chart dailyData={currentMonthStats} selectedDate={currentSelectedDate}/>
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F5F5F5',
    fontSize: 30,
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  statsContainer: {
    width: '100%',
    marginTop: 8,
  },
  statsContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 8,
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
