import { View, Text, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS } from '../constants'
import { MaterialIcons } from '@expo/vector-icons'
import ReportCard from '../components/ReportCard'
import { useEffect } from 'react'
import { useState } from 'react'

const Report = ({ route, navigation }) => {
    const [reminders, setReminders] = useState([])
    const [sortedReminders, setSortedReminders] = useState([])
    const [allMedicines, setallMedicines] = useState([])
    const routeParams = route.params

    useEffect(() => {
        const reminders = routeParams.reminders
        const sorted = [...reminders].sort((a,b)=> a.start_date.localeCompare(b.start_date))
        setSortedReminders(sorted)
        setReminders(reminders)
        setallMedicines(routeParams.medicines)
    }, [])

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
                    onPress={() => navigation.navigate('Medication Information')}
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
                <Text style={{ ...FONTS.h4 }}>Report</Text>
            </View>
        )
    }

    function renderContent() {
        return (
            <View>

                <ScrollView>
                    {sortedReminders.map((medicationInfo, index) => (
                        <ReportCard
                            navigation={navigation}
                            key={index}
                            name={medicationInfo.name}
                            description={medicationInfo.description}
                            drug_id={medicationInfo.drug_id}
                            start_date={medicationInfo.start_date}
                            end_date={medicationInfo.end_date}
                            frequency={medicationInfo.dosage_frequency}
                            drugs={allMedicines}
                        />
                    ))}
                </ScrollView>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ marginHorizontal: 10, marginBottom: 100 }}>
                    {renderHeader()}
                    {renderContent()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Report