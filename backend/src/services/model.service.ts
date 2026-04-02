import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";
/**  
 * @description This file initializes the AI models using the API keys from the configuration file. It exports the initialized models for use in other parts of the application.
 * @exports geminiModel - An instance of the ChatGoogleGenerativeAI model initialized with the Gemini API key and model name.
 * @exports mistralModel - An instance of the ChatMistralAI model initialized with the Mistral API key and model name.
 * @exports cohereModel - An instance of the ChatCohere model initialized with the Cohere API key and model name.
 */

export const geminiModel = new ChatGoogleGenerativeAI({
    apiKey: config.GEMINI_API_KEY,
    model: "gemini-flash-latest",
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.MISTRAL_API_KEY,
    model: "mistral-medium-latest",
});

export const cohereModel = new ChatCohere({
    apiKey: config.COHERE_API_KEY,
    model: "command-a-03-2025",
});