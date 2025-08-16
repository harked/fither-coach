
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { WorkoutPlan, Exercise } from '../types';
import { LockClosedIcon, DumbbellIcon } from '../components/Icons';

const WorkoutPlanCard: React.FC<{ plan: WorkoutPlan, exercises: Exercise[], isPremium: boolean, onSelect: () => void }> = ({ plan, exercises, isPremium, onSelect }) => {
    const isLocked = plan.isPremium && !isPremium;

    return (
        <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${isLocked ? 'opacity-60' : 'hover:shadow-lg transition-shadow'}`}>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                    {plan.isPremium && <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center"><LockClosedIcon/> <span className="ml-1">Premium</span></span>}
                </div>
                <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Exercises:</h4>
                    <ul className="space-y-2">
                        {plan.exercises.map((workoutEx, index) => {
                            const exerciseDetails = exercises.find(e => e.id === workoutEx.exerciseId);
                            if (!exerciseDetails) return null;
                            return (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                    <DumbbellIcon />
                                    <span className="ml-2">{exerciseDetails.name} ({workoutEx.sets} sets x {workoutEx.reps} reps)</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="mt-6">
                    <button 
                        onClick={onSelect} 
                        disabled={isLocked}
                        className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors ${isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'}`}
                    >
                        {isLocked ? 'Unlock with Premium' : 'Start Workout'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const Workouts: React.FC = () => {
    const { workoutPlans, exercises, isPremium, togglePremium } = useAppContext();
    
    const handleSelectWorkout = (plan: WorkoutPlan) => {
        if (plan.isPremium && !isPremium) {
            alert('This is a premium workout plan. Please upgrade to access.');
        } else {
            alert(`Starting workout: ${plan.name}`);
            // In a real app, you would navigate to a workout tracking screen.
        }
    };
    
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Your Workout Plans</h1>
                    <p className="text-lg text-gray-500 mt-1">Choose a plan and start your session.</p>
                </div>
                <button 
                    onClick={togglePremium}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    {isPremium ? 'Switch to Free' : 'Go Premium ✨'}
                </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workoutPlans.map(plan => (
                    <WorkoutPlanCard 
                        key={plan.id} 
                        plan={plan} 
                        exercises={exercises} 
                        isPremium={isPremium}
                        onSelect={() => handleSelectWorkout(plan)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Workouts;
