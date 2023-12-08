import { View,Text, Image } from "react-native";
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { TouchableOpacity} from "react-native";



const Dots = ({selected}) =>{
    let backgroundColor;
    backgroundColor = selected ? "#ff2156" : "#808080"
    return (
        <View
            style={{
                height: 5,
                width: 5,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    )
}

const Done = ({...props}) => (
    <TouchableOpacity
        style={{
            marginRight:12
        }}
        {...props}
    >
        <Text style ={{color: "#ff2156" }}>Done</Text>
    </TouchableOpacity>
);

const OnboardingStarter = ({navigation}) =>{
    return (
            <Onboarding
            onSkip={()=>navigation.navigate('GetStarted')}
            onDone={()=>navigation.navigate('GetStarted')}
            DotComponent={Dots}
            bottomBarColor="#ffffff"
            DoneButtonComponent={Done}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/onboardingStarter-1.jpeg')}/>,
                    title: 'Remind Your Medications1',
                    subtitle: 'Lorem ipsum dolor set maet Lorem ipsum dolor set maet Lorem ipsum dolor set maet ',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/onboardingStarter-2.jpeg')}/>,
                    title: 'Remind Your Medications2',
                    subtitle: 'Lorem ipsum dolor set maet Lorem ipsum dolor set maet Lorem ipsum dolor set maet Lorem ipsum dolor set maet',
                }
            ]}>

            </Onboarding>
    )
}

export default OnboardingStarter