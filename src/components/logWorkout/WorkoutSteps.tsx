import React from "react";
import { View, Text, Button, TextInput, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { muscleGroups, MuscleGroup } from "../../data/exercises";

export function StepCategory({ setCategory }: any) {
  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Välj träningskategori</Text>
      <Button title="Gym" onPress={() => setCategory("gym")} />
      <Button title="Löpning" onPress={() => setCategory("running")} />
    </View>
  );
}

export function StepGymMuscleGroup({ muscleGroup, setMuscleGroup, next }: any) {
  return (
    <View>
      <Text>Välj muskelgrupp</Text>
      <Picker selectedValue={muscleGroup} onValueChange={(v) => setMuscleGroup(v as MuscleGroup)}>
        <Picker.Item label="-- Välj --" value="" />
        {Object.keys(muscleGroups).map((mg) => (
          <Picker.Item key={mg} label={mg} value={mg} />
        ))}
      </Picker>
      <Button title="Nästa" onPress={next} disabled={!muscleGroup} />
    </View>
  );
}

export function StepGymExercise({
  exercise,
  setExercise,
  customExercise,
  setCustomExercise,
  muscleGroup,
  next,
}: any) {
  return (
    <View>
      <Text>Välj övning</Text>
      <Picker selectedValue={exercise} onValueChange={setExercise}>
        <Picker.Item label="-- Välj --" value="" />
        {muscleGroups[muscleGroup as MuscleGroup]?.map((ex) => (
        <Picker.Item key={ex} label={ex} value={ex} />
        ))}

      </Picker>
      <TextInput
        placeholder="Egen övning"
        value={customExercise}
        onChangeText={setCustomExercise}
      />
      <Button title="Nästa" onPress={next} disabled={!exercise && !customExercise} />
    </View>
  );
}

export function StepGymSetsReps({ sets, reps, setSets, setReps, next }: any) {
  return (
    <View>
      <TextInput
        placeholder="Antal set"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Reps per set"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
      />
      <Button title="Nästa" onPress={next} disabled={!sets || !reps} />
    </View>
  );
}

export function StepGymDate({ selectedDate, setSelectedDate, saveWorkout }: any) {
  return (
    <View>
      <Button title="Välj datum" onPress={() => setSelectedDate(new Date())} />
      <Text>Valt datum: {selectedDate.toLocaleDateString()}</Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        maximumDate={new Date()}
        onChange={(e, date) => date && setSelectedDate(date)}
      />
      <Button title="Spara pass" onPress={saveWorkout} />
    </View>
  );
}

export function StepRunningType({ runType, setRunType, next }: any) {
  return (
    <View>
      <Text>Typ av löpning</Text>
      <Picker selectedValue={runType} onValueChange={setRunType}>
        <Picker.Item label="-- Välj --" value="" />
        <Picker.Item label="Gång" value="Gång" />
        <Picker.Item label="Jogg" value="Jogg" />
        <Picker.Item label="Intervaller" value="Intervaller" />
      </Picker>
      <Button title="Nästa" onPress={next} disabled={!runType} />
    </View>
  );
}

export function StepRunningDetails({ duration, distance, setDuration, setDistance, next }: any) {
  return (
    <View>
      <TextInput
        placeholder="Tid (minuter)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Distans (km)"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
      />
      <Button title="Nästa" onPress={next} disabled={!duration || !distance} />
    </View>
  );
}

export function StepRunningDate({ selectedDate, setSelectedDate, saveWorkout }: any) {
  return (
    <View>
      <Button title="Välj datum" onPress={() => setSelectedDate(new Date())} />
      <Text>Valt datum: {selectedDate.toLocaleDateString()}</Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        maximumDate={new Date()}
        onChange={(e, date) => date && setSelectedDate(date)}
      />
      <Button title="Spara pass" onPress={saveWorkout} />
    </View>
  );
}