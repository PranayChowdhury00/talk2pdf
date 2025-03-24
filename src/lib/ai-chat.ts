import { fetchDeepSeek } from "@/lib/openrouter";

export const getAIResponse = async (userPrompt: string) => {
  try {
    const response = await fetchDeepSeek(userPrompt);
    return response; // Return the AI's answer
  } catch (error) {
    console.error("AI Fetch Error:", error);
    throw new Error("Failed to fetch AI response.");
  }
};
