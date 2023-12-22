import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import PageContainer from '../components/PageContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES } from "../constants";
import Input from '../components/Input';
import Button from '../components/Button'
import { MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons'

import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import React, { useCallback, useReducer } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import ReminderForm from '../components/ReminderForm';

const AddMedication = ({ navigation }) => {

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
                <Text style={{ ...FONTS.h4 }}>Add Reminder</Text>
            </View>
        )
    }
    function renderDescription() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginVertical: 40
                }}
            >
                <Text
                    style={{ ...FONTS.body2, color: COLORS.black }}
                >
                    Add Medicine Reminder
                </Text>
                <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.black
                    }}
                >
                    Fill out the fields and hit the Save button to add!
                </Text>
            </View>

        )
    }
    function renderForm() {

        return (
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 22,
                        alignItems: 'center'
                    }}
                >
                    <ReminderForm />
                    <View
                        style={{
                            marginVertical: 10,
                            width: '100%'
                        }}>
                        <Button
                            title="SAVE"
                            filled
                            onPress={() => navigation.navigate('Home Screen')}
                            style={{
                                width: '100%',
                            }}
                        /></View>
                </View>
            </ScrollView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{
                    height: '100%',
                    marginHorizontal: 10,
                    justifyContent: 'space-between'
                }}>
                    {renderHeader()}
                    {renderDescription()}
                    {renderForm()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default AddMedication