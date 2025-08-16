
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Exercise, WorkoutPlan, BodyMeasurement, CompletedWorkout } from '../types';
import { EXERCISES, WORKOUT_PLANS, INITIAL_MEASUREMENTS } from '../constants';

interface AppContextType {
  exercises: Exercise[];
  workoutPlans: WorkoutPlan[];
  measurements: BodyMeasurement[];
  completedWorkouts: CompletedWorkout[];
  isPremium: boolean;
  addWorkoutPlan: (plan: WorkoutPlan) => void;
  addMeasurement: (measurement: Omit<BodyMeasurement, 'date'>) => void;
  togglePremium: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(WORKOUT_PLANS);
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(INITIAL_MEASUREMENTS);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>([]);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const addWorkoutPlan = (plan: WorkoutPlan) => {
    setWorkoutPlans(prev => [...prev, plan]);
  };

  const addMeasurement = (measurement: Omit<BodyMeasurement, 'date'>) => {
    const newMeasurement: BodyMeasurement = {
      ...measurement,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    setMeasurements(prev => [...prev, newMeasurement].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };
  
  const togglePremium = () => setIsPremium(prev => !prev);

  const value = {
    exercises,
    workoutPlans,
    measurements,
    completedWorkouts,
    isPremium,
    addWorkoutPlan,
    addMeasurement,
    togglePremium,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
