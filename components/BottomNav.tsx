import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Mantra from '../pages/Mantra/Mantra';
import Reading from '../pages/Reading/Reading';
import Bhajan from '../pages/Bhajan/Bhajan';
import Dashboard from '../pages/Dashboard/Dashboard';
import {  StyleSheet, Text,View } from 'react-native';
import Mantra_Icon from '../assets/mantra_icon.svg'
import Bhajan_Icon from '../assets/bhajan_icon.svg'
import Reading_Icon from '../assets/reading_icon.svg'
import Dashboard_Icon from '../assets/dashboard_icon.svg'

import { Animated } from 'react-native';
import React from 'react';
import { sizes } from '../constants/theme';

const Tab = createBottomTabNavigator();

const BottomNav = () =>{
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor:'#E25E3E',
        tabBarInactiveTintColor:'#181818',
        tabBarStyle:styles.bottomNavbar,
        tabBarShowLabel:false,
        headerShown:false
      }}
      initialRouteName='Mantra'
      >
        <Tab.Screen name="Mantra" component={Mantra} options={{
          tabBarIcon:({focused,color})=>(
            <View style={styles.bottomNavbarItem}>
              <Mantra_Icon  fill={color}/>
              <Text style={{color:color,...styles.bottomNavbarText}}>Mantra</Text>
            </View>

          ),
        }}
        listeners={{
          focus:()=>{
            Animated.spring(offsetAnimation,{
              toValue:0,
              useNativeDriver:true,
            }).start();

          }
        }}
        />
        <Tab.Screen name="Reading" component={Reading} options={{
          tabBarIcon:({focused,color})=>(
            <View style={styles.bottomNavbarItem}>
              <Reading_Icon  fill={color}/>
              <Text style={{color:color,...styles.bottomNavbarText}}>Reading</Text>
            </View>
          ),
        }}
        listeners={{
          focus:()=>{
            Animated.spring(offsetAnimation,{
              toValue:1*(sizes.width/4),
              useNativeDriver:true,
            }).start();
          }
        }}/>
        <Tab.Screen name="Bhajan" component={Bhajan} options={{
          tabBarIcon:({focused,color})=>(
            <View style={styles.bottomNavbarItem}>
              <Bhajan_Icon  stroke={color}/>
              <Text style={{color:color,...styles.bottomNavbarText}}>Bhajan</Text>
            </View>
            
          ),
        }}
        listeners={{
          focus:()=>{
            Animated.spring(offsetAnimation,{
              toValue:2*(sizes.width/4),
              useNativeDriver:true,
            }).start();
          }
        }}/>
        <Tab.Screen name="Dashboard" component={Dashboard} options={{
          tabBarIcon:({focused,color})=>(
            <View style={styles.bottomNavbarItem}>
              <Dashboard_Icon  stroke={color}/>
              <Text style={{color:color,...styles.bottomNavbarText}}>Dashboard</Text>
            </View>
            
          ),
        }}
        listeners={{
          focus:()=>{
            Animated.spring(offsetAnimation,{
              toValue:3*(sizes.width/4),
              useNativeDriver:true,
            }).start();
          }
        }}/>
      </Tab.Navigator>
      <Animated.View style={[styles.indicator,{
        transform:[{
          translateX:offsetAnimation,
        }]
      }]}/>
    </>
  )
}

const styles = StyleSheet.create({
  bottomNavbar:{
    backgroundColor:'#E1E1E1',
    height:60,
    paddingBottom:5,
    justifyContent:'space-around',
  },
  bottomNavbarText:{
    fontSize:12,
    fontWeight:'600',
    fontFamily:'Roboto',
    textAlign:'center'
  },
  bottomNavbarItem:{
    alignItems:'center',
    justifyContent:'center',
  },
  indicator:{
    position:'absolute',
    width:'20 %',
    height:5,
    borderBottomRightRadius:4,
    borderBottomLeftRadius:4,
    left:10,
    zIndex:100,
    bottom:56,
    backgroundColor:'#E25E3E'
  }
  
});

export default BottomNav;