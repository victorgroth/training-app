import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';


export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);


    async function handleLogin() {
        try {
            const savedEmail = await SecureStore.getItemAsync('userEmail');
            const savedPassword = await SecureStore.getItemAsync('userPassword');

            if (email === savedEmail && password === savedPassword) {
               login();
            } else {
                Alert.alert('Fel', 'Fel e-post eller lösenord.');
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logga in</Text>
            <TextInput
                style={styles.input}
                placeholder="E-post"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Lösenord"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Logga in" onPress={handleLogin} />
            <Button
                title="Gå till Registrering"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

