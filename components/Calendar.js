import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'
import { COLORS, SIZES, FONTS } from '../constants'



const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelected = (date) => {
    // Handle the selected date
    setSelectedDate(date);
  };

  return (
    <View style={{ width: "100%" }}>

      <ReactNativeCalendarStrip
        daySelectionAnimation={{ type: 'border', borderWidth: 1, borderHighlightColor: COLORS.primary }}
        style={{ height: 80 }}
        selectedDate={selectedDate}
        onPressDate={handleDateSelected}
        calendarColor={COLORS.white}
        calendarHeaderStyle={FONTS.h4}
        dateNumberStyle={FONTS.b4}
        dateNameStyle={FONTS.b3}
        iconContainer={{ flex: 0.1 }}
        calendarHeaderFormat='MMMM, Y'
        highlightDateContainerStyle={COLORS.pink}
        high

      />
    </View>
  )
}


export default Calendar