import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

type Workout = {
  id: number;
  category: "gym" | "running";
  date: string;
  exercises?: {
    muscleGroup: string;
    exercise: string;
    sets: string;
    reps: string;
  }[];
  runType?: string;
  duration?: string;
  distance?: string;
};

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigation = useNavigation<any>();

  async function loadWorkouts() {
    const saved = await AsyncStorage.getItem("workouts");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Sortera nyast först
      const sorted = parsed.sort(
        (a: Workout, b: Workout) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setWorkouts(sorted);
    } else {
      setWorkouts([]);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );

  async function deleteWorkout(id: number) {
    Alert.alert("Ta bort pass", "Är du säker på att du vill ta bort det här passet?", [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Ta bort",
        style: "destructive",
        onPress: async () => {
          const updated = workouts.filter((w) => w.id !== id);
          setWorkouts(updated);
          await AsyncStorage.setItem("workouts", JSON.stringify(updated));
        },
      },
    ]);
  }

  function renderItem({ item }: { item: Workout }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.date}>
            📅 {new Date(item.date).toLocaleDateString()}
          </Text>
          <TouchableOpacity onPress={() => deleteWorkout(item.id)}>
            <Text style={styles.deleteBtn}>🗑️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          {item.category === "gym" ? "🏋️ Gym" : "🏃 Löpning"}
        </Text>

        {item.category === "gym" ? (
          item.exercises?.map((ex, i) => (
            <Text key={i} style={styles.text}>
              {ex.muscleGroup} – {ex.exercise} ({ex.sets}×{ex.reps})
            </Text>
          ))
        ) : (
          <>
            <Text style={styles.text}>Typ: {item.runType}</Text>
            <Text style={styles.text}>Tid: {item.duration} min</Text>
            <Text style={styles.text}>Distans: {item.distance} km</Text>
          </>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Träningshistorik</Text>

      <TouchableOpacity
        style={styles.statsBtn}
        onPress={() => navigation.navigate("WorkoutStats")}
      >
        <Text style={styles.statsBtnText}>📊 Visa statistik</Text>
      </TouchableOpacity>

      {workouts.length === 0 ? (
        <Text style={styles.empty}>Inga träningspass loggade ännu.</Text>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 15,
    textAlign: "center",
  },
  statsBtn: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  statsBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: { fontSize: 18 },
  date: {
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: "#555",
    marginBottom: 3,
  },
});
