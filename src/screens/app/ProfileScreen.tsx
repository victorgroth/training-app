import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    async function loadUser() {
      const savedEmail = await SecureStore.getItemAsync("userEmail");
      setEmail(savedEmail);
    }
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>👤 Profil</Text>
        {email ? (
          <Text style={styles.info}>E-post: {email}</Text>
        ) : (
          <Text style={styles.info}>Laddar användardata...</Text>
        )}

        <View style={styles.buttonWrapper}>
          <Button title="🚪 Logga ut" onPress={logout} color="#E53935" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    elevation: 3, // Android-skugga
    shadowColor: "#000", // iOS-skugga
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 10,
    width: "100%",
  },
});
