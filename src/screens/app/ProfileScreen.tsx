import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileScreen() {
    const [email, setEmail] = useState<string | null>(null);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        async function loadUser() {
            const savedEmail = await SecureStore.getItemAsync('userEmail');
            setEmail(savedEmail);
        }
        loadUser();
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>
        {email ? <Text style={styles.info}>E-post: {email}</Text> : <Text>Laddar användardata...</Text>}

        <Button title="Logga ut" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20},
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20  },
  info: { fontSize: 18, marginBottom: 20 },
});
