import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>Hemskärm</Text>
    </View>
  )
}

function LoginScreen() {
  return (
    <View>
      <Text>Logga in</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
