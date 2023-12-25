import { View, Text } from "react-native";
import React from 'react'
import { useEffect } from "react";
import { COLORS, FONTS } from "../constants";
import { useState } from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const IntakeCircle = ({ doneNum, allNum, changeDone}) => {
    const [fillValue, setFillValue] = useState(0);

    useEffect(() => {
        // Update the fill value when doneNum or allNum changes
        const fillVal=Math.round(doneNum / allNum * 100)
        setFillValue(fillVal);
        console.log(changeDone)
        console.log(fillVal)

    }, [changeDone, doneNum, allNum]);
    return (
        <View style={{
            width: 250,
            height: 250,
            borderRadius: 250,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.gray
        }}>
            <View style={{
                backgroundColor: COLORS.white,
                width: "90%",
                height: "90%",
                borderRadius: 250,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <View style={{
                    width: "90%",
                    height: "90%",
                    alignItems: "center",
                    borderRadius: 250,
                    padding: 20,
                    justifyContent: "space-around",
                    backgroundColor: COLORS.white
                }}>
                    <AnimatedCircularProgress
                        size={200}
                        width={15}
                        fill={fillValue}
                        tintColor={COLORS.primary}
                        backgroundColor={COLORS.pink}
                        rotation={180}>
                        {
                            (fill) => (
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{
                                        ...FONTS.body2
                                    }}>
                                        INTAKES
                                    </Text>
                                    <Text style={{
                                        ...FONTS.body2
                                    }}>{doneNum}/{allNum}</Text>

                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
            </View>
        </View>
    )
}

export default IntakeCircle