import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import {
  StepCategory,
  StepGymMuscleGroup,
  StepGymExercise,
  StepGymSetsReps,
  StepGymDate,
  StepRunningType,
  StepRunningDetails,
  StepRunningDate,
} from "../../components/logWorkout/WorkoutSteps";
import { MuscleGroup } from "../../data/exercises";

export default function LogWorkoutScreen() {
  const [category, setCategory] = useState<"gym" | "running" | null>(null);
  const [step, setStep] = useState(1);

  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | "">("");
  const [exercise, setExercise] = useState("");
  const [customExercise, setCustomExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const [runType, setRunType] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  async function saveWorkout() {
    let newWorkout: any = {
      id: Date.now(),
      category,
      date: selectedDate.toISOString(),
    };

    if (category === "gym") {
      newWorkout = {
        ...newWorkout,
        muscleGroup,
        exercise: customExercise || exercise,
        sets,
        reps,
      };
    } else if (category === "running") {
      newWorkout = { ...newWorkout, runType, duration, distance };
    }

    const existing = await AsyncStorage.getItem("workouts");
    const workouts = existing ? JSON.parse(existing) : [];
    workouts.push(newWorkout);
    await AsyncStorage.setItem("workouts", JSON.stringify(workouts));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    setCategory(null);
    setStep(1);
    setMuscleGroup("");
    setExercise("");
    setCustomExercise("");
    setSets("");
    setReps("");
    setRunType("");
    setDuration("");
    setDistance("");
  }

  function renderStep() {
    if (!category) {
      return <StepCategory setCategory={setCategory} />;
    }

    if (category === "gym") {
      switch (step) {
        case 1:
          return (
            <StepGymMuscleGroup
              muscleGroup={muscleGroup}
              setMuscleGroup={setMuscleGroup}
              next={() => setStep(2)}
            />
          );
        case 2:
          return (
            <StepGymExercise
              exercise={exercise}
              setExercise={setExercise}
              customExercise={customExercise}
              setCustomExercise={setCustomExercise}
              muscleGroup={muscleGroup}
              next={() => setStep(3)}
            />
          );
        case 3:
          return (
            <StepGymSetsReps
              sets={sets}
              reps={reps}
              setSets={setSets}
              setReps={setReps}
              next={() => setStep(4)}
            />
          );
        case 4:
          return (
            <StepGymDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              saveWorkout={saveWorkout}
            />
          );
      }
    }

    if (category === "running") {
      switch (step) {
        case 1:
          return (
            <StepRunningType runType={runType} setRunType={setRunType} next={() => setStep(2)} />
          );
        case 2:
          return (
            <StepRunningDetails
              duration={duration}
              distance={distance}
              setDuration={setDuration}
              setDistance={setDistance}
              next={() => setStep(3)}
            />
          );
        case 3:
          return (
            <StepRunningDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              saveWorkout={saveWorkout}
            />
          );
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>{renderStep()}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
});
