import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { muscleGroups } from "../../data/exercises";

// 1. Kategori
export function StepCategory({ setCategory, setStep }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Välj träningskategori</Text>
      <View style={styles.buttonWrapper}>
        <Button
          title="🏋️ Gym"
          onPress={() => {
            setCategory("gym");
            setStep(2);
          }}
          color="#4CAF50"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="🏃 Löpning"
          onPress={() => {
            setCategory("running");
            setStep(2);
          }}
          color="#4CAF50"
        />
      </View>
    </View>
  );
}

// 2. Gym → Muskelgrupp
export function StepGymMuscleGroup({ muscleGroup, setMuscleGroup, next }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Välj muskelgrupp</Text>
      <Picker
        selectedValue={muscleGroup}
        onValueChange={(v) => setMuscleGroup(v)}
        style={styles.picker}
      >
        <Picker.Item label="-- Välj --" value="" />
        {(Object.keys(muscleGroups) as Array<keyof typeof muscleGroups>).map((mg) => (
          <Picker.Item key={mg} label={mg} value={mg} />
        ))}
      </Picker>
      <View style={styles.buttonWrapper}>
        <Button title="Nästa" onPress={next} disabled={!muscleGroup} color="#4CAF50" />
      </View>
    </View>
  );
}

// 3. Gym → Övning
export function StepGymExercise({
  exercise,
  setExercise,
  customExercise,
  setCustomExercise,
  muscleGroup,
  next,
}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Välj övning</Text>
      <Picker selectedValue={exercise} onValueChange={setExercise} style={styles.picker}>
        <Picker.Item label="-- Välj --" value="" />
        {muscleGroup &&
          muscleGroups[muscleGroup as keyof typeof muscleGroups]?.map((ex) => (
            <Picker.Item key={ex} label={ex} value={ex} />
          ))}
      </Picker>
      <TextInput
        placeholder="Egen övning"
        value={customExercise}
        onChangeText={setCustomExercise}
        style={styles.input}
      />
      <View style={styles.buttonWrapper}>
        <Button
          title="Nästa"
          onPress={next}
          disabled={!exercise && !customExercise}
          color="#4CAF50"
        />
      </View>
    </View>
  );
}

// 4. Gym → Sets & Reps + Lägg till övning
export function StepGymSetsReps({ sets, reps, setSets, setReps, addExercise }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sets & Reps</Text>
      <TextInput
        placeholder="Antal set"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Reps per set"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttonWrapper}>
        <Button title="➕ Lägg till övning" onPress={addExercise} color="#2196F3" />
      </View>
    </View>
  );
}

// 5. Gym → Datum
export function StepGymDate({ selectedDate, setSelectedDate, saveWorkout }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Välj datum för passet</Text>
      <Text style={styles.subtitle}>
        Vald dag: {selectedDate.toLocaleDateString()}
      </Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        maximumDate={new Date()}
        onChange={(e, date) => date && setSelectedDate(date)}
      />
      <View style={styles.buttonWrapper}>
        <Button title="✅ Klar" onPress={saveWorkout} color="#4CAF50" />
      </View>
    </View>
  );
}

// Running → Typ
export function StepRunningType({ runType, setRunType, next }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Typ av löpning</Text>
      <Picker selectedValue={runType} onValueChange={setRunType} style={styles.picker}>
        <Picker.Item label="-- Välj --" value="" />
        <Picker.Item label="Gång" value="Gång" />
        <Picker.Item label="Jogg" value="Jogg" />
        <Picker.Item label="Intervaller" value="Intervaller" />
      </Picker>
      <View style={styles.buttonWrapper}>
        <Button title="Nästa" onPress={next} disabled={!runType} color="#4CAF50" />
      </View>
    </View>
  );
}

// Running → Detaljer
export function StepRunningDetails({ duration, distance, setDuration, setDistance, next }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Löpning – detaljer</Text>
      <TextInput
        placeholder="Tid (minuter)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Distans (km)"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Nästa" onPress={next} disabled={!duration || !distance} color="#4CAF50" />
      </View>
    </View>
  );
}

// Running → Datum
export function StepRunningDate({ selectedDate, setSelectedDate, saveWorkout }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Välj datum för passet</Text>
      <Text style={styles.subtitle}>
        Vald dag: {selectedDate.toLocaleDateString()}
      </Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        maximumDate={new Date()}
        onChange={(e, date) => date && setSelectedDate(date)}
      />
      <View style={styles.buttonWrapper}>
        <Button title="✅ Klar" onPress={saveWorkout} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginTop: 40
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  buttonWrapper: {
    marginTop: 15,
  },
});
