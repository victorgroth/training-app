import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/app/HomeScreen";
import LogWorkoutScreen from "../screens/app/LogWorkoutScreen";
import WorkoutHistoryScreen from "../screens/app/WorkoutHistoryScreen";
import ProfileScreen from "../screens/app/ProfileScreen";
import WorkoutStatsScreen from "../screens/app/WorkoutStatsScreen";

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "LogWorkout") iconName = "barbell";
          else if (route.name === "WorkoutHistory") iconName = "list";
          else if (route.name === "Profile") iconName = "person";
          else if (route.name === "WorkoutStats") iconName = "stats-chart";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Hem" }}
      />
      <Tab.Screen
        name="LogWorkout"
        component={LogWorkoutScreen}
        options={{ title: "Logga" }}
      />
      <Tab.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={{ title: "Historik" }}
      />
      <Tab.Screen
        name="WorkoutStats"
        component={WorkoutStatsScreen}
        options={{ title: "Statistik" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}
