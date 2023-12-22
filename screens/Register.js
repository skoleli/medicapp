import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useReducer } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, COLORS, SIZES, images } from '../constants'
import { MaterialIcons, FontAwesome, Fontisto, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useState } from 'react'
import Env from '../Env'

const initialState = {
    inputValues: {  // Include inputValues property
        fullName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    },
    inputValidities: {
        email: false,
        password: false,
        passwordConfirm: false,
    },
    formIsValid: false,
}


const Register = ({ navigation }) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [selectedAllergies, setSelectedAllergies] = useState([])

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, inputValue, validationResult: result }) // Include inputValue
        },
        [dispatchFormState]
    )
    fauxAllergies = [
        { key: 1, value: 'Substance1' },
        { key: 2, value: 'Substance2' },
        { key: 3, value: 'Substance3' },
        { key: 4, value: 'Substance4' },
        { key: 5, value: 'Substance5' },
        { key: 6, value: 'Substance6' },
    ]

    const handleRegister = async () => {
        if (!formState.formIsValid) {
            Alert.alert('Validation Error', 'Please fill in all fields.')
            return false;
        }
        const requestData = {
            name: formState.inputValues.fullName,
            email: formState.inputValues.email,
            password: formState.inputValues.password,
            password_confirm: formState.inputValues.passwordConfirm,
            // allergies: 
        }
        try {
            const signupUrl = `${Env.HOST}/signup`
            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).catch((err)=>{console.log(err)})

            if (response.ok) {
                return true;
            } else {
                const errorData = await response.json();
                Alert.alert('Registration Failed', errorData.message || 'An error occurred during registration.');
                return false;
            }
        } catch (error) {
            console.error('Registration error:', error.message);
            Alert.alert('Registration Failed', 'An error occurred during registration. Please try again later.');
            return false;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView>
                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: 22,
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={images.logo}
                            resizeMode="contain"
                            style={{
                                tintColor: COLORS.primary,
                                marginVertical: 22,
                            }}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{ ...FONTS.h1, color: COLORS.primary }}
                            >
                                Medi
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    color: COLORS.black
                                }}
                            >
                                Cap
                            </Text>
                        </View>

                        <View style={{ marginVertical: 20 }}>
                            <Input
                                icon="user"
                                iconPack={FontAwesome}
                                id="fullName"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['fullName']
                                }
                                placeholder="Enter your full name"
                            />
                            <Input
                                icon="email"
                                iconPack={MaterialIcons}
                                id="email"
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['email']}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                            />
                            <Input
                                icon="lock"
                                iconPack={FontAwesome}
                                id="password"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['password']
                                }
                                autoCapitalize="none"
                                placeholder="Enter your password"
                                secureTextEntry
                            />
                            <Input
                                icon="lock"
                                iconPack={FontAwesome}
                                id="passwordConfirm"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['passwordConfirm']
                                }
                                autoCapitalize="none"
                                placeholder="Confirm your password"
                                secureTextEntry
                            />

                        </View>
                        <Button
                            title="REGISTER"
                            filled
                            onPress={async () => {
                                const nav = await handleRegister()===true ? 'SuccessVerification': '';
                                if (nav!=''){
                                    navigation.navigate(nav)
                                }
                            }}
                            style={{
                                width: '100%',
                            }}
                        />

                        <View
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.black,
                                }}
                            >
                                Already have an account ?{' '}
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: COLORS.primary,
                                    }}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Register