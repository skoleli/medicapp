import { View, Text } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import Input from "./Input"
import { COLORS, FONTS, SIZES } from "../constants";
import { StyleSheet } from "react-native";
import { AntDesign, EvilIcons, FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons'

import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import React, { useCallback, useReducer, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useEffect } from "react";


const ReminderForm = ({toggleSelection}) => {
    const [medications, setMedications] = useState([])
    const [selectedMedicine, setSelectedMedicine] = React.useState("");
    const [selectedHorarire, setSelectedHoraire] = React.useState("");

    const [selectedStartDay, setSelectedStartDay] = useState('')
    const [selectedStartMonth, setSelectedStartMonth] = useState('')
    const [selectedStartYear, setSelectedStartYear] = useState('')

    const [selectedEndDay, setSelectedEndDay] = useState('')
    const [selectedEndMonth, setSelectedEndMonth] = useState('')
    const [selectedEndYear, setSelectedEndYear] = useState('')

    useEffect(() => {
        const fetchMedications = async () => {
          try {
            // Retrieve data from AsyncStorage
            const storedData = await AsyncStorage.getItem('all_drugs');
            const medicationsData = JSON.parse(storedData);

            // Transform medications into SelectList-compatible format
        const medicationsList = medicationsData.map((medication) => ({
            key: medication.id.toString(), // Use a unique identifier as the key
            value: medication.name, // Use the property you want to display in SelectList
            // Add more properties as needed
          }));
  
          setMedications(medicationsList);
          } catch (error) {
            console.error('Error retrieving medications data from AsyncStorage:', error);
          }
        };
    
        // Call the fetchMedications function
        fetchMedications();
      }, []);

    const days = [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
        { key: 3, value: '3' },
        { key: 4, value: '4' },
        { key: 5, value: '5' },
        { key: 6, value: '6' },
        { key: 7, value: '7' },
        { key: 8, value: '8' },
        { key: 9, value: '9' },
        { key: 10, value: '10' },
        { key: 11, value: '11' },
        { key: 12, value: '12' },
        { key: 13, value: '13' },
        { key: 14, value: '14' },
        { key: 15, value: '15' },
        { key: 16, value: '16' },
        { key: 17, value: '17' },
        { key: 18, value: '18' },
        { key: 19, value: '19' },
        { key: 20, value: '20' },
        { key: 21, value: '21' },
        { key: 22, value: '22' },
        { key: 23, value: '23' },
        { key: 24, value: '24' },
        { key: 25, value: '25' },
        { key: 26, value: '26' },
        { key: 27, value: '27' },
        { key: 28, value: '28' },
        { key: 29, value: '29' },
        { key: 30, value: '30' },
        { key: 31, value: '31' },
    ];

    const months = [
        { key: 1, value: 'January' },
        { key: 2, value: 'February' },
        { key: 3, value: 'March' },
        { key: 4, value: 'April' },
        { key: 5, value: 'May' },
        { key: 6, value: 'June' },
        { key: 7, value: 'July' },
        { key: 8, value: 'August' },
        { key: 9, value: 'September' },
        { key: 10, value: 'October' },
        { key: 11, value: 'November' },
        { key: 12, value: 'December' },
    ];

    const years = [
        { key: 2022, value: '2022' },
        { key: 2023, value: '2023' },
        { key: 2024, value: '2024' },
        { key: 2025, value: '2025' },
        { key: 2026, value: '2026' },
        { key: 2027, value: '2027' },
        { key: 2028, value: '2028' },
        { key: 2029, value: '2029' },
        { key: 2030, value: '2030' },
        { key: 2031, value: '2031' },
        { key: 2032, value: '2032' },
        { key: 2033, value: '2033' },
        { key: 2034, value: '2034' },
        { key: 2035, value: '2035' },
        { key: 2036, value: '2036' },
        { key: 2037, value: '2037' },
        { key: 2038, value: '2038' },
        { key: 2039, value: '2039' },
        { key: 2040, value: '2040' },
        { key: 2041, value: '2041' },
        { key: 2042, value: '2042' },
        { key: 2043, value: '2043' },
        { key: 2044, value: '2044' },
        { key: 2045, value: '2045' },
        { key: 2046, value: '2046' },
        { key: 2047, value: '2047' },
        { key: 2048, value: '2048' },
        { key: 2049, value: '2049' },
        { key: 2050, value: '2050' },
    ];


    const fauxhoraire = [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
        { key: 3, value: '3' },
        { key: 4, value: '4' },
    ]

    return (
        <View style={{ marginVertical: 20, width: '100%' }}>
            <View
                style={{
                    marginVertical: 5
                }}>
                <SelectList
                    setSelected={(item) => {
                        setSelectedMedicine(item) 
                        toggleSelection('drug_id', item)
                    }}
                    data={medications}
                    save="key"
                    boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                    dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                    fontFamily="regular"
                    placeholder="Select a medicine"
                    searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                    arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                    closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                />
            </View>
            <View
                style={{
                    marginVertical: 5
                }}>
                <SelectList
                    setSelected={(val) => {
                        setSelectedHoraire(val)
                        toggleSelection('dosage_frequency', val)
                    }}
                    data={fauxhoraire}
                    save="value"
                    boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                    dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                    fontFamily="regular"
                    placeholder="Select how many times a day"
                    searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                    arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                    closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                />
            </View>

            <View style={{
                marginVertical: 5,
                flexDirection: 'column'
            }}>
                <Text style={{ ...FONTS.body3 }}>Select start date:</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent:'space-between',
                }}>
                    <View style={{ width: '32%' }}>
                        <SelectList
                            setSelected={(val) => {
                                setSelectedStartYear(val)
                                toggleSelection('start_year', val)
                            }}
                            data={years}
                            save="value"
                            boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                            dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                            fontFamily="regular"
                            placeholder="year"
                            searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                            arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                            closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                        />
                    </View>
                    <View style={{ width: '32%' }}>
                        <SelectList
                            setSelected={(val) => {
                                setSelectedStartMonth(val)
                                toggleSelection('start_month', val)
                            }}
                            data={months}
                            save="key"
                            boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                            dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                            fontFamily="regular"
                            placeholder="month"
                            searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                            arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                            closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                        />
                    </View>
                    <View style={{ width: '32%' }}>
                        <SelectList
                            setSelected={(val) => {
                                setSelectedStartDay(val)
                                toggleSelection('start_day', val)
                            }}
                            data={days}
                            save="value"
                            boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                            dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                            fontFamily="regular"
                            placeholder="day"
                            searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                            arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                            closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                        />
                    </View>
                </View>
            </View>

            <View style={{
                marginVertical: 5
            }}>
                <Text style={{ ...FONTS.body3 }}>Select end date:</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent:'space-between',

                }}>
                    <View style={{ width: '32%' }}>
                        <SelectList
                            setSelected={(val) => {
                                setSelectedEndYear(val)
                                toggleSelection('end_year', val)
                            }}
                            data={years}
                            save="value"
                            boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                            dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                            fontFamily="regular"
                            placeholder="year"
                            searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                            arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                            closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                        />
                    </View>
                    <View style={{ width: '32%' }}>
                        <SelectList
                            setSelected={(val) => {
                                setSelectedEndMonth(val)
                                toggleSelection('end_month', val)
                            }}
                            data={months}
                            save="key"
                            boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                            dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                            fontFamily="regular"
                            placeholder="month"
                            searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                            arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                            closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                        />
                    </View>
                    <View style={{ width: '32%' }}>
                        <SelectList
                            setSelected={(val) => {
                                setSelectedEndDay(val)
                                toggleSelection('end_day', val)
                            }}
                            data={days}
                            save="value"
                            boxStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray, borderRadius: 12, borderWidth: 1 }}
                            dropdownStyles={{ borderColor: COLORS.primary, backgroundColor: COLORS.gray }}
                            fontFamily="regular"
                            placeholder="day"
                            searchicon={<AntDesign name='search1' color={COLORS.primary} size={14} />}
                            arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18} />}
                            closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14} />}
                        />
                    </View>
                </View>
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});
export default ReminderForm