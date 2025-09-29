import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY } from "expo-secure-store";

export default function LogWorkoutScreen() {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  async function saveWorkout() {
    if (!type || !duration) {
      Alert.alert('Fel', 'Du måste fylla i typ av träning och tid');
      return;
    }

    const newWorkout = {
      id: Date.now(),
      type,
      duration,
      notes,
      date: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem('workouts');
      const workouts = existing ? JSON.parse(existing) : [];
      workouts.push(newWorkout);

      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Alert.alert('Sparat', 'Träningspasset är sparat!');
      setType('');
      setDuration('');
      setNotes('');
    } catch (error) {
      console.error(error);
      Alert.alert('Fel', 'Kunde inte spara träningspasset');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga träningspass</Text>

      <TextInput
        style={styles.input}
        placeholder="Typ av träning (t.ex. Gym, Löpning)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Tid (minuter)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Anteckningar (valfritt)"
        value={notes}
        onChangeText={setNotes}
      />

      <Button title="Spara pass" onPress={saveWorkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});