import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons


const MedicationCard = ({ parent, name, description, drug_id, navigation, drugs }) => {
    return (
        <View
            style={{
                width: SIZES.width - 44,
                height: 150,
                borderRadius: SIZES.padding,
                backgroundColor: COLORS.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding,
                marginVertical: 4,
                borderColor: COLORS.secondaryWhite,
                borderWidth: 3,
                elevation: 2,
                shadowColor: COLORS.secondaryWhite,
                shadowRadius: 3,
            }}
        >
            <View
                style={{
                    flexDirection: 'column',
                    width: SIZES.width - 150,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                        marginVertical: 2,
                    }}
                >
                    Name
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: 500,
                    }}
                    numberOfLines={1} // Set the number of lines to display
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: COLORS.secondaryBlack,
                        marginVertical: 2,
                    }}
                >
                    Description
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: 500,
                        marginVertical: 2,
                    }}
                    numberOfLines={3} // Set the number of lines to display
                    ellipsizeMode="tail"
                >
                    {description}
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
            >
                <FontAwesome5 name='book-medical' size={50} color={COLORS.primary} />

                <TouchableOpacity onPress={() => (navigation.navigate('MedicineDetail', {parent: parent, drug_id: drug_id, drugs: drugs}))}>
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.primary,
                        }}
                    >
                        Details
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MedicationCard