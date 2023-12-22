import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import PageContainer from '../components/PageContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, EvilIcons } from '@expo/vector-icons'
import { COLORS, FONTS, SIZES } from "../constants";
import { notifications } from '../constants/data';
import NotificationCell from '../components/NotificationCell';
import React from 'react'


const Notification = ({ navigation }) => {

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
                    onPress={() => navigation.navigate('Home Screen')}
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
                <Text style={{ ...FONTS.h4 }}>Notifications</Text>
            </View>
        )
    }

    function renderContent() {
        return (<View>
            <ScrollView>
                {notifications.map((notification, index) => (
                    <NotificationCell
                        key={index}
                        value ={notification.value}
                        datetime = {notification.dateTime}
                    />
                ))}
            </ScrollView>
        </View>)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{
                    marginHorizontal: 10,
                    marginBottom:90,
                }}>
                    {renderHeader()}
                    {renderContent()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Notification