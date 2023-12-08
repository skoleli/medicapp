import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { images, COLORS, FONTS, SIZES } from '../constants'
import Button from '../components/Button'

const GetStarted = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        style={{
                            tintColor: COLORS.primary,
                            marginVertical: 80,
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

                    <View style={{ marginVertical: 40 }}>
                        <Text
                            style={{
                                ...FONTS.body3,
                                textAlign: 'center',
                            }}
                        >
                            Your reliable partner for personalized medication support
                        </Text>
                    </View>
                    <Button
                        title="LOGIN"
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            width: '100%',
                            marginBottom: SIZES.padding,
                        }}
                    />
                    <Button
                        title="REGISTER"
                        onPress={() => navigation.navigate('Register')}
                        filled
                        style={{
                            width: '100%',
                        }}
                    />
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default GetStarted