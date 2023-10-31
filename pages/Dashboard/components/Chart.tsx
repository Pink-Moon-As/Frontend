import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [45, 55, 70, 60, 75, 90, 80],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity: number = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.6,
 
};

const App: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const handleStatChange = (stat: 'daily' | 'weekly' | 'monthly') => {
    setSelectedStat(stat);
    // Fetch and update chart data based on the selected stat
    // Example: fetchDailyStats(), fetchWeeklyStats(), fetchMonthlyStats()
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:40 }}>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={chartConfig}
        yAxisLabel=''
        yAxisSuffix=''
        xAxisLabel=''
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity onPress={() => handleStatChange('daily')}>
          <Text style={selectedStat === 'daily' ? { fontWeight: 'bold' } : {}}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatChange('weekly')}>
          <Text style={selectedStat === 'weekly' ? { fontWeight: 'bold' } : {}}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatChange('monthly')}>
          <Text style={selectedStat === 'monthly' ? { fontWeight: 'bold' } : {}}>Monthly</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
