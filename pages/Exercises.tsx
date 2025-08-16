
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Exercise } from '../types';

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
        <div className="w-full h-48 overflow-hidden">
             <img src={exercise.gifUrl} alt={`${exercise.name} animation`} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800">{exercise.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                {exercise.muscles.map(muscle => (
                    <span key={muscle} className="text-xs font-semibold bg-pink-100 text-pink-700 px-2 py-1 rounded-full">{muscle}</span>
                ))}
            </div>
            <p className="text-gray-600 mt-3 text-sm">{exercise.description}</p>
        </div>
    </div>
);


const Exercises: React.FC = () => {
  const { exercises } = useAppContext();

  return (
    <div className="space-y-6">
      <header>
          <h1 className="text-4xl font-bold text-gray-800">Exercise Library</h1>
          <p className="text-lg text-gray-500 mt-1">Find the perfect moves for your workout.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {exercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default Exercises;
