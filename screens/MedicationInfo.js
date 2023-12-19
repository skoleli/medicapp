import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, FONTS } from '../constants'
import { MaterialIcons } from '@expo/vector-icons'
import { medicationInfos } from '../constants/data'
import MedicationCard from '../components/MedicationCard'

const MedicationInfo = ({ navigation }) => {
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
                    onPress={() => navigation.navigate('Home')}
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
                <Text style={{ ...FONTS.h4 }}>Medications</Text>
            </View>
        )
    }

    function renderContent() {
        return (
            <ScrollView>
                {medicationInfos.map((medicationInfo, index) => (
                    <MedicationCard
                        key={index}
                        name={medicationInfo.name}
                        description={medicationInfo.description}
                    />
                ))}
            </ScrollView>
        )
    }
    return (
        
        <SafeAreaView style={{ flex: 1}}>
            <PageContainer>
                <View
                    style={{
                        marginHorizontal: 22,
                        marginBottom: 120
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