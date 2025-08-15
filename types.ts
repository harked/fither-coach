
export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscles: string[];
  gifUrl: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  isPremium?: boolean;
}

export interface LoggedSet {
  reps: number;
  weight: number;
}

export interface LoggedExercise {
  exerciseId: string;
  sets: LoggedSet[];
}

export interface CompletedWorkout {
  id: string;
  planId: string;
  date: string; // ISO string
  loggedExercises: LoggedExercise[];
}

export interface BodyMeasurement {
    date: string; // "YYYY-MM-DD"
    weight?: number;
    waist?: number;
    hips?: number;
    bodyFat?: number;
}
