import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>In Progress 💪</Text>
      <Text style={styles.subtitle}>Din träningsresa pågår...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F5F5" },
  title: { fontSize: 28, fontWeight: "bold", color: "#4CAF50", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#555" },
});
