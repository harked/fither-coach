
import React, { useState } from 'react';
import { generateWorkoutPlan } from '../services/geminiService';
import { useAppContext } from '../context/AppContext';
import { WorkoutPlan } from '../types';
import { SparklesIcon, DumbbellIcon } from '../components/Icons';

interface GeneratedPlan {
    planName: string;
    planDescription: string;
    exercises: {
        exerciseName: string;
        sets: number;
        reps: string;
    }[];
}

const AiCoach: React.FC = () => {
    const { addWorkoutPlan, exercises: existingExercises } = useAppContext();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Please enter your goals.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedPlan(null);
        try {
            const fullPrompt = `Generate a workout plan for me. My goals are: ${prompt}. Please include equipment I might have like dumbbells, kettlebells, or just bodyweight.`;
            const plan = await generateWorkoutPlan(fullPrompt);
            setGeneratedPlan(plan);
        } catch (err) {
            if(err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const savePlan = () => {
        if (!generatedPlan) return;

        // A simple way to map generated exercise names to existing IDs if they match
        // In a real app, this would need more sophisticated fuzzy matching or a standardized exercise library
        const findExerciseId = (name: string) => {
            const found = existingExercises.find(ex => ex.name.toLowerCase() === name.toLowerCase());
            return found ? found.id : `custom-${name.replace(/\s+/g, '-').toLowerCase()}`;
        };

        const newPlan: WorkoutPlan = {
            id: `ai-${Date.now()}`,
            name: generatedPlan.planName,
            description: generatedPlan.planDescription,
            exercises: generatedPlan.exercises.map(ex => ({
                exerciseId: findExerciseId(ex.exerciseName),
                sets: ex.sets,
                reps: ex.reps,
            })),
            isPremium: false, // AI-generated plans are free
        };

        addWorkoutPlan(newPlan);
        alert('Workout plan saved!');
        setGeneratedPlan(null);
        setPrompt('');
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <header className="text-center">
                 <div className="inline-block bg-pink-100 p-3 rounded-full">
                    <SparklesIcon />
                 </div>
                <h1 className="text-4xl font-bold text-gray-800 mt-2">AI Fitness Coach</h1>
                <p className="text-lg text-gray-500 mt-1">Describe your fitness goals and get a personalized workout plan.</p>
            </header>
            
            <div className="bg-white p-8 rounded-2xl shadow-md">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="prompt" className="block text-lg font-semibold text-gray-700">What are your goals today?</label>
                    <p className="text-sm text-gray-500 mb-2">e.g., "A 30-minute full-body workout at home with dumbbells" or "a quick leg day to build strength"</p>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Tell me what you want to achieve..."
                        className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                        rows={3}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading} className="mt-4 w-full flex justify-center items-center py-3 px-4 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:bg-pink-300">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating Plan...
                            </>
                        ) : 'Create My Workout'}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            {generatedPlan && (
                 <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-gray-800">{generatedPlan.planName}</h2>
                    <p className="text-gray-600 mt-1">{generatedPlan.planDescription}</p>
                    <div className="mt-6 border-t pt-4">
                        <ul className="space-y-3">
                            {generatedPlan.exercises.map((ex, index) => (
                                <li key={index} className="flex items-center p-3 bg-pink-50 rounded-lg">
                                    <div className="text-pink-500"><DumbbellIcon /></div>
                                    <div className="ml-4 flex-grow">
                                        <p className="font-semibold text-gray-700">{ex.exerciseName}</p>
                                        <p className="text-sm text-gray-500">{ex.sets} sets of {ex.reps} reps</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={savePlan} className="mt-6 w-full py-3 px-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
                        Save This Plan
                    </button>
                </div>
            )}
        </div>
    );
};

export default AiCoach;
