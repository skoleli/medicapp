import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PageContainer from '../components/PageContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons'
import { COLORS, FONTS } from "../constants";
import React, { useState } from 'react'
import { useEffect } from 'react';


const MedicineDetail = ({route, navigation }) => {
    const [medDetail, setMedDetail] = useState({})
    const routeParams = route.params

    useEffect(()=>{
        const id = routeParams.drug_id
        const drugs = routeParams.drugs
        const details = drugs.filter((value)=>value.id === id)
        setMedDetail(details[0])
    },[])

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
                    onPress={() => routeParams.parent === 'info' ? navigation.navigate('Medication Information') : navigation.navigate('Report')}
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

    function renderContent() {
        return (
            <View style={{
                flexDirection: 'column',
                // justifyContent: 'space-evenly',
                width: '100%',
                height: '100%',

            }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent:'space-between',
                    alignItems: 'center',
                    marginVertical:20,
                    marginHorizontal:20,
                }}>
                    <Text style={{ ...FONTS.body1 }}>{medDetail.name}</Text>
                    <View style={{ marginVertical: 20, alignItems: 'center'}}>
                     <FontAwesome5 name='book-medical' size={150} color={COLORS.primary} />

                    </View>


                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Category</Text>
                        <Text style={styles.tableCell}>{medDetail.drug_category_name}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Description</Text>
                        <Text style={styles.tableCell}>{medDetail.description}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Side effects</Text>
                        <Text style={styles.tableCell}><Text>{medDetail.side_effects}</Text></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Warnings</Text>
                        <Text style={styles.tableCell}>{medDetail.warnings}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Equivalents</Text>
                        <Text style={styles.tableCell}>Ibuprofen, Acetaminophen, Naproxen</Text>
                    </View>
                    {/* Add more rows as needed */}
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{
                    marginHorizontal: 10,
                    height: '100%',
                }}>
                    {renderHeader()}
                    {renderContent()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
        marginHorizontal:5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    tableCell: {
        flex: 1,
        padding: 8,
        borderRightWidth: 1,
        borderColor: '#000',
        ...FONTS.body4
    },
});


export default MedicineDetail

