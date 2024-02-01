import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from '../constants'
import { TouchableOpacity } from "react-native";

const ReportCard = ({ navigation, name, start_date, end_date, frequency, drug_id, drugs }) => {
    return (
        <View style={{
            width: SIZES.width - 44,
            height: 125,
            borderRadius: SIZES.padding,
            backgroundColor: COLORS.white,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            marginVertical: 4,
            borderColor: COLORS.secondaryWhite,
            borderWidth: 3,
            elevation: 2,
            shadowColor: COLORS.secondaryWhite,
            shadowRadius: 3,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <View style={{
                    flexDirection: 'column',
                    width: '40%'

                }}>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>Name</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>Daily Frequency</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>Start Date</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>End Date</Text>

                </View>
                <View style={{
                    flexDirection: 'column',
                    width: '2%'

                }}>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>:</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>:</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>:</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                    }}>:</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    width: '47%'

                }}>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: 500,
                    }}>{name}</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: 500,
                    }}>{frequency}</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: 500,
                    }}>{start_date}</Text>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: 500,
                    }}>{end_date}</Text>
                </View>
            </View>
            <View style={{
                alignItems: 'flex-end',
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('MedicineDetail', {parent: 'report', drug_id: drug_id, drugs:drugs})}>
                    <Text style={{
                        color: COLORS.primary,
                        fontWeight: 900,

                    }}>
                        Get Medicine Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default ReportCard