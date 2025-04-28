import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyBOHc0PBuoQwpOfCPn0atsbwPfdZucBlMQ"

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is missing in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey });
const DEFAULT_MODEL = "gemini-2.0-flash";



export async function generateContent( contents , model = DEFAULT_MODEL) {
    console.log("sending request with:",{model,contents})
  try {
    const response = await ai.models.generateContent({ model, contents });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Example usage
async function main() {
  const result = await generateContent("gemini-2.0-flash", "Explain how AI works in a few words");
  console.log(result);
}

export default main;