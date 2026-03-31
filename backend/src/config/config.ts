import { config as dotenvConfig } from 'dotenv'

dotenvConfig()


/**
 * GEMINI_API_KEY: 
 * MISTRAL_API_KEY:
 * COHERE_API_KEY:
 */

type CONFIG = {
    GEMINI_API_KEY: string;
    MISTRAL_API_KEY: string;
    COHERE_API_KEY: string;
}

const config: CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
    COHERE_API_KEY: process.env.COHERE_API_KEY || '',
}

export default config