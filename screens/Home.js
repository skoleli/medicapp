import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { COLORS } from "../constants";
import PageContainer from '../components/PageContainer'
import IntakeCircle from '../components/IntakeCircle'
import IntakeList from "../components/Intake";
import Calendar from "../components/Calendar";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";


const Home = ({ route, navigation }) => {
    const { triggerReminder } = route.params || {};
    const [reminders, setReminders] = useState([])
    const [change, setChange] = useState(true)
    const [activeReminders, setActiveReminders] = useState([])
    const [takenReminders, setTakenReminders] = useState([])

    const lenReminders = () => {
        return activeReminders.length
    }

    const lenRemindersNonTaken = () => {
        return  takenReminders.length
    }

    const toggleTaken = (id, time) => {
        const updatedReminders = activeReminders.map((reminder) => {
            if (reminder.id === id && reminder.time === time) {
                console.log('pressed1')
                reminder.taken = !reminder.taken
            }
            setChange(!change)
            return reminder
        });
        setReminders(updatedReminders);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchDataFromStorage();
            } catch (error) {
                console.error('error:', error)
            }
        }
        fetchData();
    }, [triggerReminder]);

    useEffect(() => {
        // Filter non-taken reminders only when reminders change
        const nonTakens = activeReminders.filter((reminder) => reminder.taken === true);
        setTakenReminders(nonTakens);
    }, [activeReminders,change]); // Add reminders as a dependency


    const fetchDataFromStorage = async () => {
        try {
            const storagedata = await AsyncStorage.getItem('reminders');
            if (storagedata) {
                // Parse the string into a JavaScript object
                const parsedData = JSON.parse(storagedata);
                const editedReminders = parsedData.flatMap((reminder) => {
                    const baseReminder = {
                        ...reminder,
                        taken: false, // You can set the initial value of 'taken' as needed
                    };
                    if (reminder.status === 'ACTIVE') {
                        if (reminder.dosage_frequency === 1) {
                            // For dosage_frequency = 1, set time to '8.00 AM'
                            return [{ ...baseReminder, time: '08.00 AM', taken: false }];
                        } else if (reminder.dosage_frequency === 2) {
                            // For dosage_frequency = 2, set times to '8.00 AM' and '4.00 PM'
                            return [
                                { ...baseReminder, time: '08.00 AM', taken: false },
                                { ...baseReminder, time: '08.00 PM', taken: false },
                            ];
                        } else if (reminder.dosage_frequency === 3) {
                            // For dosage_frequency = 3, set times to '8.00 AM', '6.00 PM', and '00.00 AM'
                            return [
                                { ...baseReminder, time: '08.00 AM', taken: false },
                                { ...baseReminder, time: '06.00 PM', taken: false },
                                { ...baseReminder, time: '00.00 AM', taken: false },
                            ];
                        } else if (reminder.dosage_frequency === 4) {
                            // For dosage_frequency = 4, set times to '8.00 AM', '2.00 PM', '8.00 PM', and '00.00 AM'
                            return [
                                { ...baseReminder, time: '08.00 AM', taken: false },
                                { ...baseReminder, time: '02.00 PM', taken: false },
                                { ...baseReminder, time: '08.00 PM', taken: false },
                                { ...baseReminder, time: '00.00 AM', taken: false },
                            ];
                        }
                    }
                    return baseReminder;
                });
                setReminders(editedReminders);
                setActiveReminders(editedReminders.filter((value) => value.status === 'ACTIVE'))
            }
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
        }
    };



    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 12,
                }}
            >
                <View>
                    <View
                        style={{
                            height: 6,
                            width: 6,
                            backgroundColor: COLORS.primary,
                            borderRadius: 3,
                            position: 'absolute',
                            right: 5,
                            top: 5,
                        }}
                    ></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Ionicons
                            name="notifications-outline"
                            size={28}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AddMedicine')
                }}>
                    <AntDesign
                        name="pluscircleo"
                        size={28}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    function renderIntakes() {
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                justifyContent: 'space-between'
            }}>
                <Calendar />
                <IntakeCircle doneNum={lenRemindersNonTaken()} allNum={lenReminders()} changeDone={change} />
                <View
                    style={{
                        height: "35%",
                        marginVertical: 10
                    }}>
                    <GestureHandlerRootView>
                        <ScrollView>
                            <IntakeList reminders={activeReminders} toggleTaken={toggleTaken} />
                        </ScrollView>
                    </GestureHandlerRootView>
                </View>

            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{
                    marginHorizontal: 10,
                    marginBottom: 175
                }}>
                    {renderHeader()}
                    {renderIntakes()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )

}

export default Home