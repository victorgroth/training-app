import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Workout = {
  id: number;
  category: "gym" | "running";
  date: string;
  muscleGroup?: string;
  exercise?: string;
  sets?: string;
  reps?: string;
  runType?: string;
  duration?: string;
  distance?: string;
};

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    async function loadWorkouts() {
      const saved = await AsyncStorage.getItem("workouts");
      if (saved) {
        setWorkouts(JSON.parse(saved));
      }
    }
    loadWorkouts();
  }, []);

  function renderItem({ item }: { item: Workout }) {
    return (
      <View style={styles.card}>
        <Text style={styles.date}>
          Datum: {new Date(item.date).toLocaleDateString()}
        </Text>

        {item.category === "gym" ? (
          <>
            <Text style={styles.title}>Gym</Text>
            <Text>Muskelgrupp: {item.muscleGroup}</Text>
            <Text>Övning: {item.exercise}</Text>
            <Text>
              {item.sets} set × {item.reps} reps
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Löpning</Text>
            <Text>Typ: {item.runType}</Text>
            <Text>Tid: {item.duration} min</Text>
            <Text>Distans: {item.distance} km</Text>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Träningshistorik</Text>
      {workouts.length === 0 ? (
        <Text>Inga träningspass loggade ännu.</Text>
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
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  date: { fontWeight: "bold", marginBottom: 5 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
});
