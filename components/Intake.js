import { View, Text } from "react-native"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { COLORS, FONTS, SIZES } from "../constants"
import { useEffect } from "react"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; // Example: using FontAwesome5 icons
import { intakeList } from "../constants/data"

// clockcircleo => AntDesign
// checkcircleo => AntDesign

const IntakeNonPressed = ({ taken, name, reminder, dosage }) => {
    return (
        <View style={{
            alignItems: 'center',
            width: SIZES.width - 44,
            height: 80,
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
        }}>
            {taken ? <AntDesign name='checkcircleo' size={25} /> : <AntDesign name='clockcircleo' size={25} />}
            <View style={{
                flexDirection: 'column',
                marginHorizontal: 15
            }}>
                <Text style={{ ...FONTS.body3 }}>
                    {name}
                </Text>
                <Text style={{ ...FONTS.body4 }}>
                    {dosage}
                </Text>
            </View>
            <View style={{
                marginLeft: "auto",
                marginRight: 10,
                backgroundColor: COLORS.pink,
                padding: 10,
                borderRadius: 10,
            }}>
                <Text style={{
                    ...FONTS.body3,
                }}>
                    {reminder}
                </Text>
            </View>
        </View>
    )
}

const IntakePressed = ({ id, taken, name, reminder, dosage }) => {
    return (
        <View style={{
            backgroundColor: COLORS.pink,
            alignItems: 'center',
            width: SIZES.width - 44,
            height: 80,
            borderRadius: SIZES.padding,
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
        }}>
            <TouchableOpacity
                onPress={() => { console.log('Pressed take') }}
                style={{ marginRight: "auto", marginLeft: 10 }}
            >
                <Text style={{ ...FONTS.body2 }}>
                    TAKE
                </Text>
            </TouchableOpacity>
            <View style={{
                backgroundColor: COLORS.white,
                width: "70%",
                height: "95%",
                borderRadius: SIZES.padding,

                backgroundColor: COLORS.white,
                alignItems: "center",
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding,
                marginVertical: 4,
                borderColor: COLORS.secondaryWhite,
                borderWidth: 3,
                elevation: 2,
                shadowColor: COLORS.pink,
                shadowRadius: 3,
            }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text>
                        {name}
                    </Text>
                    <Text>
                        {dosage}
                    </Text>
                </View>
            </View>
        </View>
    )
}


const Intake = ({ id = 1, taken, name = "Med1", reminder = "7.00", dosage = "1 pill" }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    }

    const subProps = {
        id,
        taken,
        name,
        reminder,
        dosage
    }
    return (
        <GestureHandlerRootView>
            <TouchableOpacity onPress={handlePress}>
                <View>
                    {isPressed === true ? (<IntakePressed {...subProps} />) : (<IntakeNonPressed {...subProps} />)}
                </View>
            </TouchableOpacity>
        </GestureHandlerRootView>
    )
}

const IntakeList = () => {
    return (
        <View>
            {
                intakeList.map((intake, index) => {
                    return <Intake 
                        key={index}
                        name={intake.name}
                        reminder={intake.reminder}
                        dosage={intake.dosage}
                    />
                })
            }

        </View>
    )
}


export default IntakeList