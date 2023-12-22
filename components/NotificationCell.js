import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons

const NotificationCell = ({ value, datetime }) => {
    return (
        <View style={{
            width: SIZES.width - 20,
            height: 120,
            borderRadius: SIZES.padding,
            backgroundColor: COLORS.white,
            flexDirection: 'column',
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.padding,
            marginVertical: 4,
            borderColor: COLORS.secondaryWhite,
            borderWidth: 3,
            elevation: 2,
            shadowColor: COLORS.secondaryWhite,
            shadowRadius: 2,
        }}>
            <Text
                style={{
                    fontSize: 14,
                    color: COLORS.secondaryGray,
                    fontWeight: 500,
                }}
            >
                {datetime}
            </Text>
            <View
                style={{
                    width: SIZES.width - 45,
                    height: 80,
                    borderRadius: SIZES.padding,
                    backgroundColor: COLORS.white,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding,
                    marginVertical: 4,
                    borderColor: COLORS.gray,
                    borderWidth: 3,
                    elevation: 2,
                    shadowColor: COLORS.secondaryWhite,
                    shadowRadius: 2,
                }}
            >

                <FontAwesome5 name='exclamation' size={25} color={COLORS.primary} />

                <View
                    style={{
                        width: SIZES.width - 65,
                    height: 80,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: 8,
                    marginVertical: 4,

                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLORS.black,
                            fontWeight: 500,
                        }}
                    >
                        {value}
                    </Text>

                </View>
            </View>
        </View>
    )
}

export default NotificationCell