import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { COLORS } from "../constants";
import PageContainer from '../components/PageContainer'
import IntakeCircle from '../components/IntakeCircle'
import IntakeList from "../components/Intake";
import Calendar from "../components/Calendar";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const Home = ({navigation}) => {
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 12,
                }}
            >
                <View>
                    <View
                        style={{
                            height: 6,
                            width: 6,
                            backgroundColor: COLORS.primary,
                            borderRadius: 3,
                            position: 'absolute',
                            right: 5,
                            top: 5,
                        }}
                    ></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Ionicons
                            name="notifications-outline"
                            size={28}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddMedication')}>
                    <AntDesign
                        name="pluscircleo"
                        size={28}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    function renderIntakes() {
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                justifyContent:'space-between'
            }}>
                <Calendar/>
                <IntakeCircle />
                <View
                style={{
                    height:"35%",
                    marginVertical: 10
                }}>
                <GestureHandlerRootView>
                    <ScrollView>
                        <IntakeList/>
                    </ScrollView>
                </GestureHandlerRootView>
                </View>
                
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{
                    marginHorizontal: 10,
                    marginBottom:200
                }}>
                    {renderHeader()}
                    {renderIntakes()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Home