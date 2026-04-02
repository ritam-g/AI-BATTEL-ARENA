import { ChatCohere } from "@langchain/cohere";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogle } from "@langchain/google";
import { getConfig } from "../config/config.js";



export const geminiModel = new ChatGoogle({
    model: "gemini-flash-latest",
    apiKey: getConfig.GEMINI_API_KEY,
})

export const mistralAIModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: getConfig.MISTRAL_API_KEY,
})


export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: getConfig.COHERE_API_KEY,
})
