import { View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import Input from "./Input"
import Button from "./Button";
import { COLORS, FONTS, SIZES } from "../constants";

import { AntDesign, EvilIcons, FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons'

import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import React, { useCallback, useReducer } from 'react'


const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const ReminderForm = ({navigation}) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const [selectedMedicine, setSelectedMedicine] = React.useState("");
    const [selectedHorarire, setSelectedHoraire] = React.useState("");

    const fauxmed = [
        { key: 1, value: 'Med1' },
        { key: 2, value: 'Med2' },
        { key: 3, value: 'Med3' },
        { key: 4, value: 'Med4' },
        { key: 5, value: 'Med5' },
        { key: 6, value: 'Med6' },
    ]

    const fauxhoraire =[
        { key: 1, value: '8.00' },
        { key: 2, value: '12.00' },
        { key: 3, value: '16.00' },
        { key: 4, value: '20.00' },
        { key: 5, value: '00.00' },
        { key: 6, value: '04.00' },
    ]

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result })
        },
        [dispatchFormState]
    )
    return (
        <View style={{ marginVertical: 20 }}>
            <View
            style={{
                marginVertical:5
            }}>
            <SelectList
                setSelected={(val) => setSelectedMedicine(val)}
                data={fauxmed}
                save="value"
                boxStyles={{borderColor:COLORS.primary, backgroundColor: COLORS.gray, borderRadius:12, borderWidth:1}}
                dropdownStyles={{borderColor:COLORS.primary, backgroundColor: COLORS.gray}}
                fontFamily="regular"
                placeholder="Select a medicine"
                searchicon={<AntDesign name='search1' color={COLORS.primary} size={14}/>}
                arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18}/>}
                closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14}/>} 
            />
            </View>
            <Input
                id="amount"
                onInputChanged={inputChangedHandler}
                errorText={
                    formState.inputValidities['amount']
                }
                placeholder="  Enter amount (e.g. 3)"
            />

            <Input
                id="dose"
                onInputChanged={inputChangedHandler}
                errorText={
                    formState.inputValidities['dose']
                }
                placeholder="  Enter dose (e.g. 100mg)"
            />
            <View
            style={{
                marginVertical:5
            }}>
            <SelectList
                setSelected={(val) => setSelectedHoraire(val)}
                data={fauxhoraire}
                save="value"
                boxStyles={{borderColor:COLORS.primary, backgroundColor: COLORS.gray, borderRadius:12, borderWidth:1}}
                dropdownStyles={{borderColor:COLORS.primary, backgroundColor: COLORS.gray}}
                fontFamily="regular"
                placeholder="Select reminder time"
                searchicon={<AntDesign name='search1' color={COLORS.primary} size={14}/>}
                arrowicon={<FontAwesome5 name='chevron-down' color={COLORS.primary} size={18}/>}
                closeicon={<Fontisto name='close-a' color={COLORS.primary} size={14}/>}
            />
            </View>
        </View>

    )
}

export default ReminderForm