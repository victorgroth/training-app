import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

type Workout = {
  id: number;
  category: "gym" | "running";
  date: string;
  exercises?: { muscleGroup: string; exercise: string; sets: string; reps: string }[];
  runType?: string;
};

export default function WorkoutStatsScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  async function loadWorkouts() {
    const saved = await AsyncStorage.getItem("workouts");
    if (saved) {
      setWorkouts(JSON.parse(saved));
    }
  }

  // ✅ Ladda om varje gång skärmen blir aktiv
  useFocusEffect(
    React.useCallback(() => {
      loadWorkouts();
    }, [])
  );

  // Antal pass per månad
  const monthlyData = new Array(12).fill(0);
  workouts.forEach((w) => {
    const d = new Date(w.date);
    const month = d.getMonth();
    monthlyData[month] += 1;
  });

  // Antal pass denna vecka
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // måndag
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weeklyCount = workouts.filter((w) => {
    const d = new Date(w.date);
    return d >= startOfWeek && d <= endOfWeek;
  }).length;

  // Antal pass detta år
  const year = now.getFullYear();
  const yearlyCount = workouts.filter((w) => {
    const d = new Date(w.date);
    return d.getFullYear() === year;
  }).length;

  // Fördelning av pass
  // Fördelning av pass
const typeCount: Record<string, number> = {};
workouts.forEach((w) => {
  if (w.category === "gym" && Array.isArray((w as any).exercises)) {
    (w as any).exercises.forEach((ex: any) => {
      const key = ex.muscleGroup || "Okänd";
      typeCount[key] = (typeCount[key] || 0) + 1;
    });
  } else if (w.category === "running") {
    const key = w.runType || "Okänd";
    typeCount[key] = (typeCount[key] || 0) + 1;
  }
});


  const pieData = Object.keys(typeCount).map((key, index) => ({
    name: key,
    population: typeCount[key],
    color: ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#009688", "#FF5722"][index % 7],
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Träningsstatistik</Text>

      {/* Summeringar */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>🏋️ Denna vecka: {weeklyCount} pass</Text>
        <Text style={styles.summaryText}>📅 Detta år: {yearlyCount} pass</Text>
      </View>

      <Text style={styles.subHeader}>Antal pass per månad</Text>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
          datasets: [{ data: monthlyData }],
        }}
        width={screenWidth - 20}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: () => "#333",
        }}
        bezier
        style={styles.chart}
      />

      <Text style={styles.subHeader}>Fördelning av pass</Text>
      {pieData.length > 0 ? (
        <PieChart
          data={pieData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Inga data att visa ännu.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 10 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 50,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  chart: { marginVertical: 8, borderRadius: 12 },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  emptyCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});
