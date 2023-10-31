import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Sparkle_Icon from '../../../assets/sparkle_icon.svg';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Color_Indicator_SVG from '../../../assets/color_indicator.svg'
import DateTimePickerModal from "react-native-modal-datetime-picker";


LocaleConfig.locales['custom'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

interface MonthStats {
  [date: string]: number;
}

interface FormattedMonthStats {
  [date: string]: {
    customStyles: {
      container: {
        backgroundColor: string;
        borderRadius: number;
      };
      text: {
        color: string;
      };
    };
  };
}
const currentMonthStats :MonthStats= {
  "2023-10-01": 0,
  "2023-10-02": 0,
  "2023-10-03": 42,
  "2023-10-04": 198,
  "2023-10-05": 55,
  "2023-10-06": 301,
  "2023-10-07": 0,
  "2023-10-08": 153,
  "2023-10-09": 223,
  "2023-10-10": 0,
  "2023-10-11": 7,
  "2023-10-12": 281,
  "2023-10-13": 0,
  "2023-10-14": 175,
  "2023-10-15": 222,
  "2023-10-16": 43,
  "2023-10-17": 286,
  "2023-10-18": 0,
  "2023-10-19": 88,
  "2023-10-20": 17,
  "2023-10-21": 0,
  "2023-10-22": 94,
  "2023-10-23": 244,
  "2023-10-24": 0,
  "2023-10-25": 201,
  "2023-10-26": 2,
  "2023-10-27": 149,
  "2023-10-28": 180,
  "2023-10-29": 36,
  "2023-10-30": 98,
  "2023-10-31": 0
}


function CalendarComponent() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [year, setYear] = useState((new Date()).getFullYear())
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const formattedDates:FormattedMonthStats = {};

  for (const key in currentMonthStats) {
    const value = currentMonthStats[key];
    let backgroundColor;
    let textColor;
  
    if (value === 0) {
      backgroundColor = "white";
      textColor = "black"; // Set text color to black for value 0
    } else if (value < 75) {
      backgroundColor = "#D7E0C3";
      textColor = "white"; // Set text color to white for other values
    } else if (value < 150) {
      backgroundColor = "#ABD357";
      textColor = "white";
    } else if (value < 225) {
      backgroundColor = "#6F961D";
      textColor = "white";
    } else {
      backgroundColor = "#3C5800";
      textColor = "white";
    }
  
    formattedDates[key] = {
      customStyles: {
        container: {
          backgroundColor,
          borderRadius: 50,
        },
        text: {
          color: textColor, // Set text color based on the condition
        },
      },
    };
  }

  const handleConfirm = (date: Date) => {
    const currentDate = new Date();
    if (date <= currentDate) {
      const selectedMonth = date.toLocaleString('default', { month: 'long' });
      const selectedYear = date.getFullYear();
      setMonth(selectedMonth);
      setYear(selectedYear);
      hideDatePicker();
      setSelectedDate(date)
      console.log(date)
    } else {
      hideDatePicker();
    }
  };

 
  return (
    <View>
      <View style={styles.topContainer}>

        <View style={styles.curDateContainer}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.yearText}>{year}</Text>
            <Text style={styles.monthText}>{month}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.currentStreakBox}>
          <Sparkle_Icon />
          <View style={styles.streakTextContainer}>
            <Text>5 day chant streak</Text>
            <Text>Saturday</Text>
          </View>
        </View>
      </View>
      <Calendar 
        style={styles.calendarStyle} 
        headerStyle={{ display: 'none' }} 
        current={selectedDate.toDateString()} 
        key={selectedDate.toDateString()} 
        markingType={'custom'}
        markedDates={formattedDates}
        disableMonthChange={true}
      />
      <Color_Indicator_SVG height={40} style={{ alignSelf: 'flex-end', marginRight: 20 }} />
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"  // Change the mode to "date"
        display="spinner"  // Change the display mode to "spinner"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()} // Prevent selecting future dates
      />
    </View>
  );
}

const styles = StyleSheet.create({
  curDateContainer: {
    flex: 1,
    height: 65,
    justifyContent: 'center',
  },
  topContainer: {
    width: '100 %',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  currentStreakBox: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(215, 215, 215, 0.53)',
    height: 65,
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  streakTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(215, 215, 215, 0.53)',
    height: 65,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  calendarStyle: {
    backgroundColor: '#F5F5F5',
  },
  yearText: {
    color: '#181818',
    fontSize: 26,
    fontWeight: '600',
  },
  monthText: {
    color: '#181818',
    fontSize: 18,
    fontWeight: '400'
  },

});

export default CalendarComponent;
