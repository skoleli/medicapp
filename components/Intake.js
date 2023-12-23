import { View, Text } from "react-native"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { COLORS, FONTS, SIZES } from "../constants"
import { useEffect } from "react"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; // Example: using FontAwesome5 icons
import { intakeList } from "../constants/data"
import { Alert } from "react-native"

// clockcircleo => AntDesign
// checkcircleo => AntDesign

const IntakeNonPressed = ({ taken, name, time }) => {
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
            {taken ? <AntDesign name='checkcircleo' size={25} color={COLORS.primary}/> : <AntDesign name='clockcircleo' size={25}  />}
            <View style={{
                flexDirection: 'column',
                marginHorizontal: 15
            }}>
                <Text style={{ ...FONTS.body3 }}>
                    {name}
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
                    {time}
                </Text>
            </View>
        </View>
    )
}

const IntakePressed = ({ id, taken, name, time, toggleTaken, warnings }) => {
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
                onPress={() => {
                    toggleTaken(id, time)
                }}
                style={{ marginRight: "auto", marginLeft: 10 }}
            >
                <Text style={{ ...FONTS.body2 }}>
                    TAKE
                </Text>
            </TouchableOpacity>
            <View style={{
                backgroundColor: COLORS.white,
                width: "60%",
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
                    <Text style={{ ...FONTS.body4 }}>
                        {name}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                        {time}
                    </Text>
                </View>


            </View>
            <TouchableOpacity
                onPress={() => Alert.alert('Medicine Warnings', warnings)}
                style={{
                    height: 44,
                    width: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AntDesign name='infocirlceo' size={20}></AntDesign>
            </TouchableOpacity>
        </View>
    )
}


const Intake = ({ id = 1, taken, name = "Med1", time = "7.00", toggleTaken, warnings }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    }

    const subProps = {
        id,
        taken,
        name,
        time,
        toggleTaken,
        warnings
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

const IntakeList = ({ reminders, toggleTaken }) => {
    return (
        <View>
            {
                reminders.map((intake, index) => {
                    return <Intake
                        key={index}
                        id={intake.id}
                        name={intake.name}
                        time={intake.time}
                        taken={intake.taken}
                        warnings={intake.warnings}
                        toggleTaken={toggleTaken}
                    />
                })
            }

        </View>
    )
}


export default IntakeList