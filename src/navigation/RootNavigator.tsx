import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const loggedIn = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(loggedIn === 'true');
        }
        checkLogin();
    }, []);

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}