import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import PageContainer from '../components/PageContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, EvilIcons } from '@expo/vector-icons'
import { COLORS, FONTS, SIZES } from "../constants";

import React from 'react'


const MedicineDetail = ({ parent, navigation }) => {

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
                    onPress={() => parent !== 'info' ? navigation.navigate('Medication Information'): navigation.navigate('Report') }
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
                <Text style={{ ...FONTS.h4 }}>Medicine Details</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <PageContainer>
                <View style={{
                    marginHorizontal: 10
                }}>
                    {renderHeader()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default MedicineDetail