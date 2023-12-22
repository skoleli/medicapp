import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useReducer } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, images, FONTS, SIZES } from '../constants'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Env from '../Env'
import { setURLs, RequestURL,getAllDrugs, getDrugCategories, getReminders } from '../api/sessionData';

const initialState = {
    inputValues: {
        email: '',
        password: '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
};

const Login = ({ navigation }) => {
    const [accessToken, setAccessToken] = useState('')
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, inputValue, validationResult: result })
        },
        [dispatchFormState]
    )

    const handleLogin = async () => {
        if (!formState.formIsValid) {
            Alert.alert('Validation Error', 'Please fill in all fields.')
            return false;
        }

        const requestData = {
            email: formState.inputValues.email,
            password: formState.inputValues.password,
        }
        console.log(requestData)
        try {
            const loginUrl = `${Env.HOST}/login`

            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('login geldi:' , responseData)
                await AsyncStorage.setItem('token', responseData['token'])
                await AsyncStorage.setItem('user_id', String(responseData['user_id']))
                return true;
            } else {
                const errorData = await response.json();
                Alert.alert('Login Failed', errorData.message || 'An error occurred during logging in.');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error.message);
            Alert.alert('Login Failed', 'An error occurred during logging in. Please try again later.');
            return false;
        }
    }

    const getSessionData = async () => {
        // getAllDrugs, getDrugCategories, getReminders
        try {
            await setURLs();
            const token = await AsyncStorage.getItem('token')
            const allDrugs = await getAllDrugs(RequestURL.allDrugs, token);
            await AsyncStorage.setItem('all_drugs', JSON.stringify(allDrugs))
            const allCategories = await getDrugCategories(RequestURL.drugCategories, token)
            await AsyncStorage.setItem('all_categories', JSON.stringify(allCategories))
            const reminders = await getReminders(RequestURL.remindersUrl, token)
            await AsyncStorage.setItem('reminders', JSON.stringify(reminders))
            return true;
        } catch (error) {
            console.error('fetch error:', error.message);
            Alert.alert('Process Failed', 'An error occurred during fetching user data. Please try again later.');
            return false;
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <PageContainer>
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
                            marginVertical: 48,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
                            Medi
                        </Text>
                        <Text
                            style={{
                                ...FONTS.h1,
                                color: COLORS.black,
                            }}
                        >
                            Cap
                        </Text>
                    </View>

                    <View style={{ marginVertical: 20 }}>
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
                            errorText={formState.inputValidities['password']}
                            autoCapitalize="none"
                            placeholder="Enter your password"
                            secureTextEntry
                        />
                    </View>
                    <Button
                        title="LOGIN"
                        filled
                        onPress={async () => {
                            const success = await handleLogin()
                            if (success === true) {
                                const ok = await getSessionData()
                                if (ok === true) {
                                    navigation.navigate('BottomTabNavigation')
                                }
                                // navigation.navigate('BottomTabNavigation')

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
                            Don't have an account ?{' '}
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.primary,
                                }}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Login