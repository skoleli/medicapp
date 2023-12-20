import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, FONTS } from '../constants'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { medicationInfos } from '../constants/data'
import MedicationCard from '../components/MedicationCard'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons


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
                    onPress={() => navigation.navigate('Home Screen')}
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

                <TouchableOpacity
                    onPress={() => navigation.navigate('Search')}
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 4,
                        backgroundColor: COLORS.secondaryWhite,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AntDesign
                        name="search1"
                        size={24}
                        color={COLORS.black}
                    />

                </TouchableOpacity>
            </View>
        )
    }

    function renderContent() {
        return (
            <View>
                <ScrollView>
                    {medicationInfos.map((medicationInfo, index) => (
                        <MedicationCard
                            navigation={navigation}
                            key={index}
                            name={medicationInfo.name}
                            description={medicationInfo.description}
                            parent = 'info'
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
                                10
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
                                05
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
                                onPress={() => navigation.navigate('Report')}
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
                        marginBottom:330
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