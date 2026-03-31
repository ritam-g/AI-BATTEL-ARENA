// for now i want to import all thing from laggraph
import { StateSchema, MessagesValue, StateGraph, START, END } from "@langchain/langgraph";

/**
 * @description This file defines the state schema and initial state for the AI battle arena. It imports necessary components from the LangGraph library and sets up the structure for managing the state of the AI battle, including messages, solutions, and judgement.
 * @exports state - An object representing the initial state of the AI battle, including messages, solutions, and judgement.
 * @typedef {Object} JUDGEMENT - An object representing the judgement of the battle, including the winner, scores, and reasoning.
 * @typedef {Object} AIBATTLESTATE - An object representing the overall state of the AI battle, including messages, solutions, and judgement.
 * 
*/
type JUDGEMENT={
    winner: "solution_1" | "solution_2" ;
    solution_1_score: number;
    solution_2_score: number;
    winner_reasoning: string;
    loser_reasoning: string;
}
type AIBATTLESTATE={
    messages:typeof MessagesValue,
    solution_1: string;
    solution_2: string;
    judgement: JUDGEMENT | null;
}

/**  
 * @description The initial state of the AI battle arena, which includes an array of messages, placeholders for the solutions from both AI models, and a judgement object that will be populated after the battle is evaluated. The judgement object contains information about the winner, scores for both solutions, and reasoning for the judgement.
 * @exports state - An object representing the initial state of the AI battle, including messages, solutions, and judgement.
 * @type {AIBATTLESTATE}
 */

const state:AIBATTLESTATE={
    messages:MessagesValue,
    solution_1: "",
    solution_2: "",
    judgement: {
        winner: "solution_1",
        solution_1_score: 0,
        solution_2_score: 0,
        winner_reasoning: "",
        loser_reasoning: "",
    }
}