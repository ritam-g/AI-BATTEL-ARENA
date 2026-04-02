import { config } from "dotenv";
config();

// mistral apikey
// cohere apikey
// gemini apikey
type CONFIG = {
    MISTRAL_API_KEY: string,
    COHERE_API_KEY: string,
    GEMINI_API_KEY: string,
}

// TODO: add more config variables as needed
export const getConfig: CONFIG = {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
}