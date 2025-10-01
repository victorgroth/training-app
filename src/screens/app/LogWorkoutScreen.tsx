import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StepCategory,
  StepGymMuscleGroup,
  StepGymExercise,
  StepGymSetsReps,
  StepRunningType,
  StepRunningDetails,
  StepGymDate,
  StepRunningDate,
} from "../../components/logWorkout/WorkoutSteps";

export default function LogWorkoutScreen({ navigation }: any) {
  const [category, setCategory] = useState<"gym" | "running" | null>(null);

  // Gym-states
  const [muscleGroup, setMuscleGroup] = useState("");
  const [exercise, setExercise] = useState("");
  const [customExercise, setCustomExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [exercises, setExercises] = useState<any[]>([]);

  // Running-states
  const [runType, setRunType] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");

  // Datum
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateStep, setShowDateStep] = useState(false);

  // Steg
  const [step, setStep] = useState(1);

  // Lägg till en övning i listan
  function addExercise() {
    const finalExercise = exercise || customExercise;
    if (!finalExercise || !sets || !reps) return;

    setExercises((prev) => [
      ...prev,
      { muscleGroup, exercise: finalExercise, sets, reps },
    ]);

    // Reset för nästa övning
    setExercise("");
    setCustomExercise("");
    setSets("");
    setReps("");
    setMuscleGroup("");
    setStep(2); // Tillbaka till muskelgruppsvalet
  }

  // Spara hela passet
async function saveWorkout() {
  const newWorkout = {
    id: Date.now(),
    category,
    date: selectedDate.toISOString(),
    exercises,
    runType,
    duration,
    distance,
  };

  const saved = await AsyncStorage.getItem("workouts");
  const parsed = saved ? JSON.parse(saved) : [];
  parsed.push(newWorkout);
  await AsyncStorage.setItem("workouts", JSON.stringify(parsed));

  // 🔄 Reset för nytt pass
  setCategory(null);
  setStep(1);
  setExercises([]);
  setRunType("");
  setDuration("");
  setDistance("");
  setSelectedDate(new Date());
  setShowDateStep(false); // 👈 viktig fix!

  // Tillbaka till historiken
  navigation.jumpTo("WorkoutHistory");
}


  return (
    <ScrollView style={styles.container}>
     {!category && <StepCategory setCategory={setCategory} setStep={setStep} />}

      {/* Gym-flöde */}
      {category === "gym" && !showDateStep && (
        <>
          {step === 2 && (
            <StepGymMuscleGroup
              muscleGroup={muscleGroup}
              setMuscleGroup={setMuscleGroup}
              next={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepGymExercise
              exercise={exercise}
              setExercise={setExercise}
              customExercise={customExercise}
              setCustomExercise={setCustomExercise}
              muscleGroup={muscleGroup}
              next={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <StepGymSetsReps
              sets={sets}
              reps={reps}
              setSets={setSets}
              setReps={setReps}
              addExercise={addExercise}
            />
          )}

          {/* Lista över tillagda övningar */}
          {exercises.length > 0 && (
            <View style={styles.exerciseList}>
              <Text style={styles.listTitle}>Tillagda övningar:</Text>
              {exercises.map((ex, idx) => (
                <Text key={idx} style={styles.exerciseItem}>
                  {ex.muscleGroup} – {ex.exercise} ({ex.sets}×{ex.reps})
                </Text>
              ))}
            </View>
          )}

          {/* Spara pass-knappen */}
          {exercises.length > 0 && (
            <View style={styles.saveWrapper}>
              <Button
                title="✅ Spara pass"
                onPress={() => setShowDateStep(true)}
                color="#4CAF50"
              />
            </View>
          )}
        </>
      )}

      {/* Running-flöde */}
      {category === "running" && !showDateStep && (
        <>
          {step === 2 && (
            <StepRunningType runType={runType} setRunType={setRunType} next={() => setStep(3)} />
          )}
          {step === 3 && (
            <StepRunningDetails
              duration={duration}
              distance={distance}
              setDuration={setDuration}
              setDistance={setDistance}
              next={() => setShowDateStep(true)}
            />
          )}
        </>
      )}

      {/* Datumsteg (både gym och running) */}
      {showDateStep && category === "gym" && (
        <StepGymDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          saveWorkout={saveWorkout}
        />
      )}
      {showDateStep && category === "running" && (
        <StepRunningDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          saveWorkout={saveWorkout}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  exerciseList: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  exerciseItem: {
    fontSize: 15,
    marginBottom: 5,
    color: "#555",
  },
  saveWrapper: {
    marginVertical: 20,
  },
});
