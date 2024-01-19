import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const weeklyLabel = ["W14", "W13", "W12", "W11", "W10", "W9", "W8", "W7", "W6", "W5", "W4", "W3", "W2", "W1"]

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}
interface DataEntry {
  date: string;
  count: number;
}
const chartDataDummy = {
  labels: ["","","","","","","","","","","","","",""],
  datasets: [
    {
      data: [],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#F5F5F5',
  backgroundGradientTo: '#F5F5F5',
  color: (opacity: number = 1) => `rgba(226, 94, 62, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.4,
  backgroundColor: '#F5F5F5',
  fillShadowGradientFrom:"#FFA778",
  fillShadowGradientFromOpacity:1,
  fillShadowGradientTo:"#FFA778",
  fillShadowGradientToOpacity:1,
  decimalPlaces:2
  
 
};
interface MonthlyStats {
  [key: string]: number;
}
type propTypes = {
  dailyData:MonthlyStats,
  selectedDate:string
}
interface DataObject {
  date: string;
  count: number;
}
const BarGraph = ({dailyData, selectedDate}:propTypes) => {
  const [selectedStat, setSelectedStat] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  // const [sortedByDate, setSortedByDate] = useState<DataObject[]>([])
  const [chartData, setChartData] = useState<ChartData>(chartDataDummy)
  // useEffect(() => {
  //   const dataArray = Object.entries(dailyData).map(([date, count]) => ({ date, count }));
  //   dataArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //   setSortedByDate(dataArray)
  //   handleStatChange(selectedStat)
  // }, [])

  useEffect(() => {
    const fetchData = async()=>{
      const url = "http://localhost:3000/get_graph_data"
      const data = {
        type:"Chanting",
        freq:selectedStat,
        date:selectedDate
      }
      const token = await AsyncStorage.getItem('auth_token')
      const headers = {
        Authorization: `Bearer ${token}`, 
      };
      const res = await axios.post(url,data,{headers});
      let formattedData = res.data.dataArray.map((entry: DataEntry) => entry.count);
      console.log(formattedData)
      formattedData =formattedData.map((entry:number)=>entry/108)
      const dataForChart = {
        labels:[],
        datasets:[
          {
            data:formattedData
          }
        ]
      }

      setChartData(dataForChart);


    }
    
    fetchData();
   
  }, [selectedStat, selectedDate])
  
  
  const handleStatChange = (stat: 'daily' | 'weekly' | 'monthly') => {
    setSelectedStat(stat);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:30 }}>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between",width:Dimensions.get('window')['width']-24, marginBottom:15,alignItems:"center"}}>
        <Text style={{fontSize:18,fontWeight:"600"}}>Your Progress</Text>
        <View style={{ flexDirection: 'row',width:"55 %", justifyContent:"space-evenly", backgroundColor:"#EAEAEA", borderRadius:200,alignItems:"center"}}>
          <TouchableOpacity onPress={() => handleStatChange('daily')} style={[{flex:1, borderBottomLeftRadius:400, borderTopLeftRadius:400,paddingVertical:5},selectedStat==='daily'?{backgroundColor:"#343434"}:{}]}>
            <Text style={[selectedStat === 'daily' ? { fontWeight: '500', color:"white"} : {},{textAlign:"center",justifyContent:"center"}]}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStatChange('weekly')} style={[selectedStat==='weekly'?{backgroundColor:"#343434"}:{},{flex:1, paddingVertical:5}]}>
            <Text style={[selectedStat === 'weekly' ? { fontWeight: '500', color:"white" } : {},{textAlign:"center",justifyContent:"center"}]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStatChange('monthly')} style={[{flex:1, borderBottomRightRadius:400, borderTopRightRadius:400, paddingVertical:5,paddingRight:2},selectedStat==='monthly'?{backgroundColor:"#343434"}:{}]}>
            <Text style={[selectedStat === 'monthly' ? { fontWeight: '500', color:"white" } : {},{textAlign:"center",justifyContent:"center"}]}>Monthly</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width}
        height={250}
        chartConfig={chartConfig}
        yAxisLabel=''
        yAxisSuffix=''
        xAxisLabel=''
        withInnerLines = {false}
        style={{marginRight:10}}
        // verticalLabelRotation={-90}
        
      />

      
    </View>
  );
};

export default BarGraph;
