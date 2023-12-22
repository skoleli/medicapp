import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import {
    MaterialIcons,
    Feather,
    EvilIcons,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    AntDesign,
} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import * as Location from 'expo-location'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons


const Profile = ({ navigation }) => {
    const [address, setAddress] = useState('Loading...')
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }

            let location = await Location.getCurrentPositionAsync()
            const text = JSON.stringify(location)
            const parsedData = JSON.parse(text)
            const longitude = parsedData.coords.longitude
            const latitude = parsedData.coords.latitude
            let address = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            })

            setAddress(
                `${address[0].name},${address[0].district},${address[0].city}`
            )
        }

        getPermissions()
    }, [])
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
                <Text style={{ ...FONTS.h4 }}>Profile</Text>
            </View>
        )
    }

    function renderProfile() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    marginVertical: 22,
                }}
            >   
                {/* TODO: add user icon */}
                <Image
                    source={images.user3} 
                    resizeMode="contain"
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: SIZES.padding,
                    }}
                />
                <Text style={{ ...FONTS.h2, marginTop: 24 }}> username </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: SIZES.padding,
                    }}
                >
                </View>
            </View>
        )
    }

    function renderUserInfo(){
        return(
            <View
            style = {{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
                justifyContent: 'space-between',
            }}
            >
                <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: 150,

                }}>
                    <Text style={{...FONTS.body2}}>
                        <FontAwesome5 name ='user' size={16} color='gray'/> Name
                    </Text>
                    <Text style={{...FONTS.body2}}>
                        <FontAwesome5 name ='birthday-cake' size={16} color='gray'/> Birth Date
                    </Text>
                    <Text style={{...FONTS.body2}}>
                        <FontAwesome5 name ='envelope' size={16} color='gray'/> E-Mail
                    </Text>
                    <Text style={{...FONTS.body2}}>
                        <FontAwesome5 name ='venus-mars' size={16} color='gray'/> Gender
                    </Text>
                    <Text style={{...FONTS.body2}}>
                        <FontAwesome5 name ='allergies' size={16} color='gray'/> Allergies
                    </Text>    
                </View>

                <View
                style={{
                    flexDirection: 'column',
                    alignItems:'flex-end',
                    height: 150,

                }}>
                     <Text style={{...FONTS.body2}}>:</Text>
                     <Text style={{...FONTS.body2}}>:</Text>
                     <Text style={{...FONTS.body2}}>:</Text>
                     <Text style={{...FONTS.body2}}>:</Text>
                     <Text style={{...FONTS.body2}}>:</Text>
                </View>

                <View
                style={{
                    flexDirection: 'column',
                    alignItems:'flex-end',
                    justifyContent:'space-between',
                    height: 150,
                    
                }}>
                    <Text style={{...FONTS.body3}}>isim soy isim</Text>
                    <Text style={{...FONTS.body3}}>1.1.1999</Text>
                    <Text style={{...FONTS.body3}}>m@m.com</Text>
                    <Text style={{...FONTS.body3}}>Female</Text>
                    <Text style={{...FONTS.body3}}>Peanut, soy beans</Text>
                </View>

            </View>
        )
    }

    function renderSettings() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignItems:'flex-end'
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => console.log('Pressed')}
                    // TODO: add log out function
                >
                    <AntDesign name="logout" size={24} color={COLORS.primary} />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: 24,
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ 
                    marginHorizontal: 22,
                    justifyContent: 'space-evenly', 
                }}>
                    {renderHeader()}
                    {renderProfile()}
                    {renderUserInfo()}
                    {renderSettings()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Profile