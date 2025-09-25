import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/app/HomeScreen';
import LogWorkoutScreen from '../screens/app/LogWorkoutScreen';
import WorkoutHistoryScreen from '../screens/app/WorkoutHistoryScreen';
import ProfileScreen from '../screens/app/ProfileScreen';

export type AppStackParamList = {
    Home: undefined;
    LogWorkout: undefined;
    WorkoutHistory: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} />
            <Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

