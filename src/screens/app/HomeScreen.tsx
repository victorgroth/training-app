import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation}: any) {
    return (
        <View style={styles.container}>
      <Text style={styles.title}>Hemskärm</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Logga träningspass"
          onPress={() => navigation.navigate('LogWorkout')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Träningshistorik"
          onPress={() => navigation.navigate('WorkoutHistory')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Profil"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  buttonContainer: { marginVertical: 10, width: '80%' },
});