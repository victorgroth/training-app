import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Workout = {
    id: number;
  type: string;
  duration: string;
  notes: string;
  date: string;
};

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    async function loadWorkouts() {
      const stored = await AsyncStorage.getItem('workouts');
      if (stored) {
        setWorkouts(JSON.parse(stored));
      }
    }
    loadWorkouts();
  }, []);

  const renderItem = ({ item }: { item: Workout }) => (
    <View style={styles.item}>
      <Text style={styles.type}>{item.type}</Text>
      <Text>Tid: {item.duration} min</Text>
      {item.notes ? <Text>Anteckningar: {item.notes}</Text> : null}
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Träningshistorik</Text>
      {workouts.length === 0 ? (
        <Text>Inga sparade träningspass ännu.</Text>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  type: { fontSize: 18, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#666', marginTop: 5 },
});