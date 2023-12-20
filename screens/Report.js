import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, FONTS, images } from '../constants'
import { MaterialIcons, EvilIcons } from '@expo/vector-icons'
import { features } from '../constants/data'
import Button from '../components/Button'
import { medicationInfos } from '../constants/data'
import MedicationCard from '../components/MedicationCard'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons

const Report = ({ navigation }) => {
    const renderItem = ({ item, index }) => (
        <View
            key={index}
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
                {item.volume}
            </Text>
            <Text
                style={{
                    ...FONTS.body4,
                }}
            >
                {item.substance}
            </Text>
        </View>
    )

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
                    {medicationInfos.map((medicationInfo, index) => (
                        <MedicationCard
                            key={index}
                            name={medicationInfo.name}
                            description={medicationInfo.description}
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