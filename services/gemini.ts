import { GoogleGenAI, Type } from "@google/genai";
import { ProjectBlueprint, ProjectComplexity } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectBlueprint = async (userIdea: string): Promise<ProjectBlueprint> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this app idea for a client of Web Giants (a premium web/android dev agency): "${userIdea}". 
      Create a technical proposal blueprint.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy, professional name for the project" },
            stack: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of modern technologies (e.g., React, Kotlin, Node.js)"
            },
            estimatedWeeks: { type: Type.INTEGER, description: "Estimated development time in weeks" },
            complexity: { 
              type: Type.STRING, 
              enum: [ProjectComplexity.LOW, ProjectComplexity.MEDIUM, ProjectComplexity.HIGH] 
            },
            marketingBlurb: { type: Type.STRING, description: "A 2-sentence hype pitch for why this app will succeed." },
            keyFeatures: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-4 core technical features"
            }
          },
          required: ["title", "stack", "estimatedWeeks", "complexity", "marketingBlurb", "keyFeatures"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ProjectBlueprint;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data if API key is missing/fails in preview
    return {
      title: "Project Titan (Fallback)",
      stack: ["React Native", "Firebase", "Node.js"],
      estimatedWeeks: 8,
      complexity: ProjectComplexity.MEDIUM,
      marketingBlurb: "We are having trouble connecting to our AI architect, but your idea sounds scalable and robust.",
      keyFeatures: ["User Authentication", "Real-time Database", "Push Notifications"]
    };
  }
};