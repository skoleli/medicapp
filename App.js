import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native';
import { Home, Login, OTPVerification, 
  OnboardingStarter, Register, SuccessVerification,
  ResetPassword, GetStarted, MedicationInfo, Search, Report, Profile, AddMedication, Notification,
  MedicineDetail } from './screens';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect , useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import BottomTabNavigation from './ navigation/BottomTabNavigation';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const[isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(()=>{
    AsyncStorage.getItem("alreadyLaunched").then(value =>{
      if(value == null){
        AsyncStorage.setItem("alreadyLaunched","true");
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    })
  }, []);

  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Poppins-Black.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName={isFirstLaunch ? "OnboardingStarter" : "GetStarted"}
      >
        <Stack.Screen
          name="OnboardingStarter"
          component={OnboardingStarter}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name = "BottomTabNavigation"
          component={BottomTabNavigation}
          options= {{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="SuccessVerification"
          component={SuccessVerification}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="MedicationInfo"
          component={MedicationInfo}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="AddMedicine"
          component={AddMedication}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="MedicineDetail"
          component={MedicineDetail}
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
