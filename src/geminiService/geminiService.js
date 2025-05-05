import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = "AIzaSyACM8vvC6haHJeFRpwV-I2NoZ1lKCMheVI"; // Replace with your actual API key

export const fetchGeminiResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are Saarthi, a solar energy expert assistant. Provide concise, accurate answers about solar panels, installations, savings, and related topics. Keep responses under 3 sentences unless detailed explanation is needed.
            
            Question: ${userMessage}`,
              },
            ],
          },
        ],
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topP: 1,
          maxOutputTokens: 200,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data.candidates[0].content.parts[0].text ||
      "I couldn't generate a response. Please try again."
    );
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Our solar experts are currently busy. Please try again later.";
  }
};
