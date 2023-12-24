import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, FONTS } from '../constants'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { medicationInfos } from '../constants/data'
import MedicationCard from '../components/MedicationCard'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert } from 'react-native'

const MedicationInfo = ({ navigation }) => {
    const [activeReminders, setActiveReminders] = useState([])
    const [reminders, setReminders] = useState([])
    const [medicines, setMedicines] = useState([])

    useEffect(() => {
        getRemindersFromStorage()
        getDrugsFromStorage()
    }, [])

    const getRemindersFromStorage = async () => {
        try {
            const storageData = await AsyncStorage.getItem('reminders')
            const parsedData = JSON.parse(storageData)
            const activeRemindersData = parsedData.filter((reminder) => reminder.status === 'ACTIVE')

            setReminders(parsedData)
            setActiveReminders(activeRemindersData)
        } catch (error) {
            Alert.alert('Error getting reminder data, please try again later.')
            console.log('error getting reminders:', error)
        }
    }

    const getDrugsFromStorage = async () =>{
        try{
            const storageData = await AsyncStorage.getItem('all_drugs')
            const parsedData = JSON.parse(storageData)

            setMedicines(parsedData)
        } catch(error){
            Alert.alert('Error geting medicine details, please try again later.')
            console.log('error getting drugs', error)
        }
    }

    function lenReminders() {
        return reminders.length
    }


    function lenActiveReminders() {
        return activeReminders.length
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
                    onPress={() => navigation.navigate('Home Screen', { triggerReminder: true })}
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
                        navigation={navigation}
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>

                <Text style={{ ...FONTS.h4 }}>Medications</Text>
            </View>
        )
    }

    function renderContent() {
        return (
            <View>
                <ScrollView>
                    {activeReminders.map((medicationInfo, index) => (
                        <MedicationCard
                            navigation={navigation}
                            key={index}
                            name={medicationInfo.name}
                            description={medicationInfo.description}
                            drug_id={medicationInfo.drug_id}
                            drugs={medicines}
                            parent='info'
                        />
                    ))}
                </ScrollView>
                <View
                    style={{
                        flexDirection: 'column'
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                borderRadius: 8,
                                height: 74,
                                width: 110,
                                borderColor: COLORS.secondaryWhite,
                                borderWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    fontWeight: 'bold',
                                }}
                            >
                                {lenReminders()}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.body4,
                                }}
                            >
                                Total Used
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                borderRadius: 8,
                                height: 74,
                                width: 110,
                                borderColor: COLORS.secondaryWhite,
                                borderWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    fontWeight: 'bold',
                                }}
                            >
                                {lenActiveReminders()}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.body4,
                                }}
                            >
                                Current
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                borderRadius: 8,
                                height: 74,
                                width: 110,
                                borderColor: COLORS.secondaryWhite,
                                borderWidth: 2,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Report', {reminders: reminders, medicines: medicines})}
                                style={{
                                    height: 74,
                                    width: 110,
                                    borderRadius: 4,
                                    backgroundColor: COLORS.White,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesome5
                                    name="file-medical"
                                    size={18}
                                    color={COLORS.black}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                    }}
                                >
                                    Get Report
                                </Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        marginHorizontal: 10,
                        marginBottom: 330
                    }}
                >
                    {renderHeader()}
                    {renderContent()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default MedicationInfo