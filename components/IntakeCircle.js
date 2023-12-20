import { View, Text } from "react-native";
import React from 'react'
import { COLORS } from "../constants";

import { AnimatedCircularProgress } from 'react-native-circular-progress';


const IntakeCircle = () => {
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
                        fill={25}
                        tintColor={COLORS.primary}
                        backgroundColor={COLORS.pink}>
                        {
                            (fill) => (
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{
                                        
                                    }}>
                                        intakes
                                    </Text>
                                    <Text>1/2</Text>
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