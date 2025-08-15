
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, this would be a fatal error.
  // For this example, we'll allow the app to run but the AI feature will fail.
  console.error("Gemini API key not found in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const workoutPlanSchema = {
  type: Type.OBJECT,
  properties: {
    planName: {
      type: Type.STRING,
      description: "A creative and motivating name for the workout plan, e.g., 'Sunrise Strength Builder'.",
    },
    planDescription: {
      type: Type.STRING,
      description: "A brief, one-sentence description of the workout plan's focus.",
    },
    exercises: {
      type: Type.ARRAY,
      description: "A list of exercises for this workout plan.",
      items: {
        type: Type.OBJECT,
        properties: {
          exerciseName: {
            type: Type.STRING,
            description: "The name of the exercise, e.g., 'Goblet Squat'. Should be a common, recognizable name.",
          },
          sets: {
            type: Type.INTEGER,
            description: "The number of sets to perform for this exercise.",
          },
          reps: {
            type: Type.STRING,
            description: "The target repetition range, e.g., '8-12' or '15'.",
          },
        },
        required: ["exerciseName", "sets", "reps"],
      },
    },
  },
  required: ["planName", "planDescription", "exercises"],
};


export const generateWorkoutPlan = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error("API Key is not configured.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert fitness coach specializing in creating workout plans for women. Your goal is to generate a single, effective workout session based on the user's request. Create a workout plan with 4-6 exercises. Use common exercise names. The response must strictly follow the provided JSON schema.`,
        responseMimeType: "application/json",
        responseSchema: workoutPlanSchema,
      },
    });
    
    const text = response.text.trim();
    return JSON.parse(text);

  } catch (error) {
    console.error("Error generating workout plan with Gemini:", error);
    throw new Error("Failed to generate AI workout plan. Please check your prompt or API key.");
  }
};
