import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation}: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hemskärm</Text>
            <Button title="Logga Träningspass" onPress={() => navigation.navigate('LogWorkout')} />
            <Button title="Visa träningshistorik" onPress={() => navigation.navigate('WorkoutHistory')} />
            <Button title="Profil" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});