
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectBlueprint, ProjectComplexity } from "../types";

// Function to safely get the AI client only when needed
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProjectBlueprint = async (userIdea: string): Promise<ProjectBlueprint> => {
  try {
    // Initialize client here to prevent app crash on load if key is missing
    const ai = getAiClient();
    
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
    console.warn("Gemini API access restricted or key missing. Generating simulation blueprint.");
    
    // SMART FALLBACK: Generate a realistic blueprint based on user input to ensure functionality
    // This allows the "AI Architect" to function demonstrably even without a live API key.
    
    const keywords = userIdea.toLowerCase();
    let title = "Project Titan";
    let stack = ["React", "Node.js", "PostgreSQL"];
    let features = ["User Authentication", "Admin Dashboard", "Responsive UI"];
    let complexity = ProjectComplexity.MEDIUM;
    let weeks = 8;
    
    if (keywords.includes("shop") || keywords.includes("commerce") || keywords.includes("store")) {
      title = "NovaCommerce";
      stack = ["Next.js", "Stripe API", "Supabase"];
      features = ["Secure Checkout", "Inventory Management", "Real-time Order Tracking"];
      complexity = ProjectComplexity.HIGH;
      weeks = 12;
    } else if (keywords.includes("social") || keywords.includes("chat") || keywords.includes("connect")) {
      title = "PulseStream";
      stack = ["React Native", "Firebase", "WebRTC"];
      features = ["Live Messaging", "Social Feed", "Push Notifications"];
      complexity = ProjectComplexity.HIGH;
      weeks = 14;
    } else if (keywords.includes("ai") || keywords.includes("bot")) {
      title = "MindCore AI";
      stack = ["Python", "TensorFlow", "FastAPI"];
      features = ["LLM Integration", "Predictive Analytics", "Automated Workflows"];
      complexity = ProjectComplexity.HIGH;
      weeks = 16;
    } else {
       // Generic but professional fallback
       title = "Apex Digital Solution";
       stack = ["React", "Tailwind CSS", "Node.js"];
       features = ["Modern UI/UX", "Cloud Deployment", "Secure Authentication"];
       complexity = ProjectComplexity.LOW;
       weeks = 6;
    }

    // Delay to simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      title: title,
      stack: stack,
      estimatedWeeks: weeks,
      complexity: complexity,
      marketingBlurb: "Based on our preliminary analysis, this architecture offers the optimal balance of performance and scalability. (Simulation Mode active - Add API Key for live AI generation)",
      keyFeatures: features
    };
  }
};
