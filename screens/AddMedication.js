import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import PageContainer from '../components/PageContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES } from "../constants";
import Input from '../components/Input';
import Button from '../components/Button'
import { MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons'

import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import React, { useCallback, useReducer } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import ReminderForm from '../components/ReminderForm';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RequestURL, addReminder, setURLs } from '../api/sessionData'
import { Alert } from 'react-native';

const AddMedication = ({ navigation }) => {

    const [med, setMed] = useState({
        drug_id: '',
        dosage_frequency: '',
        is_fasting: false,
        start_day: '',
        start_month: '',
        start_year: '',
        end_day: '',
        end_month: '',
        end_year: ''
    });

    function toggleSelection(id, val) {
        setMed((prevMed) => ({
            ...prevMed,
            [id]: val
        }));

    };

    const handleSave = async () => {
        try {
            await setURLs()
            const url = RequestURL.addDrugUrl
            const token = await AsyncStorage.getItem('token')
            const drugId = parseInt(med.drug_id, 10)
            const dosage_frequency = parseInt(med.dosage_frequency, 10)
            const is_fasting = false


            let start_date = ''
            let end_date = ''
            if (med.start_month < 10) {
                if (med.start_day < 10) {
                    start_date = `${med.start_year}-0${med.start_month}-0${med.start_day}`

                } else {
                    start_date = `${med.start_year}-0${med.start_month}-${med.start_day}`
                }
            } else {
                if (med.start_day < 10) {
                    start_date = `${med.start_year}-${med.start_month}-0${med.start_day}`
                } else {
                    start_date = `${med.start_year}-${med.start_month}-${med.start_day}`

                }
            }
            if (med.end_month < 10) {
                if (med.end_day < 10) {
                    end_date = `${med.end_year}-0${med.end_month}-0${med.end_day}`

                } else {
                    end_date = `${med.end_year}-0${med.end_month}-${med.end_day}`
                }
            } else {
                if (med.end_day < 10) {
                    end_date = `${med.end_year}-${med.end_month}-0${med.end_day}`
                } else {
                    end_date = `${med.end_year}-${med.end_month}-${med.end_day}`

                }
            }


            await addReminder(url, token, drugId, dosage_frequency, is_fasting, start_date, end_date)

        } catch (error) {
            Alert.alert("Can't add medicine right now, please try later.")
            console.log(error)
        }

    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Home Screen', { triggerReminder: true })
                    }}
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 4,
                        backgroundColor: COLORS.secondaryWhite,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h4 }}>Add Reminder</Text>
            </View>
        )
    }
    function renderDescription() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginVertical: 40
                }}
            >
                <Text
                    style={{ ...FONTS.body2, color: COLORS.black }}
                >
                    Add Medicine Reminder
                </Text>
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.black
                    }}
                >
                    Fill out the fields and hit the Save button to add!
                </Text>
            </View>

        )
    }
    function renderForm() {

        return (
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 22,
                    alignItems: 'center'
                }}
            >
                <ReminderForm toggleSelection={toggleSelection} />
                <View
                    style={{
                        marginVertical: 10,
                        width: '100%'
                    }}>
                    <Button
                        title="SAVE"
                        filled
                        onPress={async () => {
                            await handleSave()
                            navigation.navigate('Home Screen', { triggerReminder: true })
                        }}
                        style={{
                            width: '100%',
                        }}
                    /></View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{
                    height: '100%',
                    marginHorizontal: 10,
                    justifyContent: 'space-between'
                }}>
                    {renderHeader()}
                    {renderDescription()}
                    {renderForm()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default AddMedication