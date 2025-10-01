export type Exercise = {
  muscleGroup: string;
  exercise: string;
  sets: string;
  reps: string;
};

export type Workout = {
  id: number;
  category: "gym" | "running";
  date: string;
  exercises?: Exercise[];
  runType?: string;
  duration?: string;
  distance?: string;
};
