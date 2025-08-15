
import { Exercise, WorkoutPlan, BodyMeasurement } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: 'ex1',
    name: 'Glute Bridge',
    description: 'Lie on your back with your knees bent and feet flat on the floor. Lift your hips off the floor until your knees, hips and shoulders form a straight line.',
    muscles: ['Glutes', 'Hamstrings'],
    gifUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExejc1b2Vjb3BmdHl0eXNtaDZ5aGlwZWl6c3J0Z3k4ZTFqNGRzMGU1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y1A2K9hCgJOT6/giphy.gif',
  },
  {
    id: 'ex2',
    name: 'Squats',
    description: 'Stand with your feet shoulder-width apart. Lower your hips as if sitting back in a chair, keeping your chest up and back straight.',
    muscles: ['Quads', 'Glutes', 'Hamstrings'],
    gifUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2J2eDl0b201aW55ZW92azBtbGZlZmQwcXh4azR1ZGNyb3B0ZmVpNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6Mbhg8nZdzf2w436/giphy.gif',
  },
  {
    id: 'ex3',
    name: 'Plank',
    description: 'Hold a push-up position with your body forming a straight line from your head to your heels. Engage your core.',
    muscles: ['Core', 'Abs'],
    gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDBqZW0wMnkweXVrMm5sZDBicnN5NWJ0ZjlxYXIwYXNzbGplN3BhaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnJA6zyOEEp4vJAgG/giphy.gif',
  },
  {
    id: 'ex4',
    name: 'Dumbbell Rows',
    description: 'Hinge at your hips with a flat back, holding a dumbbell. Pull the dumbbell up towards your chest, squeezing your back muscles.',
    muscles: ['Back', 'Biceps'],
    gifUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTNqZ3V5bmF3a2w4bDZ0azk0Nms4ZmFtbGRjaXNrc3Z2Z3pmbzd6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Id1A6l3Hw39vO/giphy.gif',
  },
  {
    id: 'ex5',
    name: 'Lunges',
    description: 'Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle. Push back to the starting position.',
    muscles: ['Quads', 'Glutes'],
    gifUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExem1qY3NrbHRpcHprcGx1a3d0MXo4aHpmZmNpa2k4Z2ZnbWJ2dm1maCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a7aO44gV2aT84/giphy.gif',
  },
];

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'wp1',
    name: 'Home Bodyweight Blast',
    description: 'A quick and effective full-body workout you can do anywhere, no equipment needed.',
    exercises: [
      { exerciseId: 'ex2', sets: 3, reps: '15' },
      { exerciseId: 'ex1', sets: 3, reps: '15' },
      { exerciseId: 'ex5', sets: 3, reps: '12 per leg' },
      { exerciseId: 'ex3', sets: 3, reps: '30-60s hold' },
    ],
    isPremium: false,
  },
  {
    id: 'wp2',
    name: 'Gym Glute Builder',
    description: 'A gym-based workout focused on building and strengthening your glutes.',
    exercises: [
      { exerciseId: 'ex1', sets: 4, reps: '12-15' },
      { exerciseId: 'ex2', sets: 4, reps: '8-12' },
      { exerciseId: 'ex5', sets: 3, reps: '10 per leg' },
    ],
    isPremium: true,
  },
  {
    id: 'wp3',
    name: 'Upper Body Tone',
    description: 'Shape and tone your upper body with this dumbbell-focused routine.',
    exercises: [
      { exerciseId: 'ex4', sets: 3, reps: '10-12' },
    ],
    isPremium: true,
  }
];

export const INITIAL_MEASUREMENTS: BodyMeasurement[] = [
    { date: '2024-05-01', weight: 68, waist: 76, hips: 99, bodyFat: 25 },
    { date: '2024-05-15', weight: 67.5, waist: 75, hips: 98.5, bodyFat: 24.5 },
    { date: '2024-06-01', weight: 67, waist: 74, hips: 98, bodyFat: 24 },
    { date: '2024-06-15', weight: 66, waist: 73, hips: 98, bodyFat: 23.5 },
    { date: '2024-07-01', weight: 65.5, waist: 72, hips: 97, bodyFat: 23 },
];
