import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      if (!email || !password) {
        Alert.alert('Fel', 'Du måste fylla i både e-post och lösenord');
        return;
      }

      await SecureStore.setItemAsync('userEmail', email);
      await SecureStore.setItemAsync('userPassword', password);

      Alert.alert('Klar!', 'Användare registrerad. Du kan nu logga in.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Fel', 'Kunde inte registrera användare');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrera dig</Text>
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
      <Button title="Registrera" onPress={handleRegister} />
      <Button
        title="Tillbaka till Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
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