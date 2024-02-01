import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import {
    MaterialIcons,
    AntDesign,
} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { FontAwesome5 } from '@expo/vector-icons'; // Example: using FontAwesome5 icons
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }) => {
    const unknown = 'unknown'
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    useEffect(()=>{
        getUserInfo()
    },[])

    const getUserInfo = async ()=>{
        const mail = await AsyncStorage.getItem('email')
        const uname = await AsyncStorage.getItem('username')
        setUsername(uname)
        setEmail(mail)
    }

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
                    onPress={() => navigation.navigate('Home Screen', { triggerReminder: true })}
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
                    source={images.userunknown} 
                    resizeMode="contain"
                    style={{
                        height: 150,
                        width: 150,
                        borderRadius: SIZES.padding,
                    }}
                />
                <Text style={{ ...FONTS.h2, marginTop: 24 }}> {username} </Text>
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
                    <Text style={{...FONTS.body3}}>{username}</Text>
                    <Text style={{...FONTS.body3}}>{unknown}</Text>
                    <Text style={{...FONTS.body3}}>{email}</Text>
                    <Text style={{...FONTS.body3}}>{unknown}</Text>
                    <Text style={{...FONTS.body3}}>{unknown}</Text>
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
                    onPress={async() => {
                        try{
                            await AsyncStorage.removeItem('token')
                            await AsyncStorage.removeItem('user_id')
                            navigation.navigate('Login')
                        }catch(error){
                            console.error('error logging out:', error)
                        }
                    }}
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