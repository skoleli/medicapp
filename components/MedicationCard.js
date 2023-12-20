import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons


const MedicationCard = (props) => {
    return (
        <View
            style={{
                width: SIZES.width - 44,
                height: 140,
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
                >
                    {props.name}
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
                >
                    {props.description}
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
            >
                <FontAwesome5 name ='book-medical' size={50} color = {COLORS.primary} />
                {/* TODO: add med details */}
                <TouchableOpacity onPress={props.onPress}>
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.primary,
                        }}
                    >
                        Details
                        {/* TODO: add details screen */}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MedicationCard