// new way of wring the code using the new syntax of typescript 5.9.3
// ==============================
// STEP 1: Import required modules
// ==============================
// - Import HumanMessage (for user input)
// - Import StateSchema, MessagesValue, ReducedValue (for state)
// - Import StateGraph, START, END (for graph flow)
// - Import your AI models (mistral, cohere, gemini)
// - Import createAgent and providerStrategy (for judge)
import { StateSchema, MessagesValue, ReducedValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import {  z } from "zod";
import { mistralModel, cohereModel, geminiModel } from "./model.service.js";
import { createAgent } from "langchain";




// ==============================
// STEP 2: Create State (Memory)
// ==============================
// - Define a StateSchema
// - Add "messages" to store user input
// - Add "solution_1" (string, default "")
// - Add "solution_2" (string, default "")
// - Add "judge_recommendation" (object with scores)
// - Use ReducedValue with reducer → always return "next"
const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => next
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => next
    }),
    //NOTE - this is the new way of defining the state with the new syntax of typescript 5.9.3
    // !    In LangGraph, schema defines the structure of the state,
    //! default sets the initial value,
    //! and reducer defines how the state should update when new data is returned from nodes.
    judge_recommendation: new ReducedValue(z.object({ solution_1_score: z.number(), solution_2_score: z.number() }).default(
        {
            solution_1_score: 0,
            solution_2_score: 0,
        }
    ), {
        reducer: (current, next) => next
    })

});

// ==============================
// STEP 3: Create solutionNode
// ==============================
// - This node generates 2 solutions
// - Take input from state.messages[0].text
// - Call mistralModel.invoke()
// - Call cohereModel.invoke()
// - Use Promise.all for parallel execution
// - Return { solution_1, solution_2 }
// - DO NOT modify state directly → return object

//! We define GraphNode<typeof State> as the type of the function.
//! So the state parameter automatically follows that structure,
//! and the function must return data that matches the State fields.
const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
    console.log(state);
    const input = state.messages[0].content as string;

    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke([new HumanMessage(input)]),
        cohereModel.invoke([new HumanMessage(input)])
    ]);

    return {
        solution_1: mistral_solution.content,
        solution_2: cohere_solution.content
    }
};

// ==============================
// STEP 4: Create judgeNode
// ==============================
// - This node compares both solutions
// - Read solution_1 and solution_2 from state
// - Create judge agent using geminiModel
// - Use providerStrategy with zod schema
//   → enforce output: { solution_1_score, solution_2_score }
// - Pass problem + both solutions inside HumanMessage
// - Call judge.invoke()
// - Extract structuredResponse
// - Return { judge_recommendation }
//NOTE - 
//! 🧠 ONE LINE

// !👉 Use agent only when you need control, structure, or decision-making
const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {

    console.log('invoking judge with state', state);
    const { solution_1, solution_2 } = state;
    const judge = createAgent({
        model: geminiModel,
        tools: [],
    });

    const input = state.messages[0].content as string;

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(
                `You are a strict AI judge.

Evaluate both solutions for the given problem and score each one from 0 to 10.

Problem:
${input}

Solution 1:
${solution_1}

Solution 2:
${solution_2}

Return ONLY valid JSON:
{
  "solution_1_score": number,
  "solution_2_score": number
}`
            )
        ]
    });

    console.log('judge response', judgeResponse);

    // We read the final AI message content and parse it manually because
    // Gemini responses can be plain text JSON even when structured output is unreliable.
    const lastMessage = judgeResponse.messages.at(-1);
    const content = typeof lastMessage?.content === "string" ? lastMessage.content : "";

    // Use a safe fallback so the graph state always gets a valid score object.
    let judge_recommendation: {
        solution_1_score: number;
        solution_2_score: number;
    };

    try {
        judge_recommendation = JSON.parse(content) as {
            solution_1_score: number;
            solution_2_score: number;
        };
    } catch {
        judge_recommendation = {
            solution_1_score: 0,
            solution_2_score: 0
        };
    }

    return {
        judge_recommendation
    }

}

// ==============================
// STEP 5: Create Graph
// ==============================
// - Initialize graph using new StateGraph(State)
// - Add nodes:
//     → "solution" → solutionNode
//     → "judge" → judgeNode
// ! hre we define the flow of the graph by connecting 
// !the nodes with edges. The flow starts at START, goes to the "solution" node, then to the "judge" node, and finally ends at END. Each node takes the state as input and returns updates to the state, which are then passed along to the next node in the flow.
const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile()

// ==============================
// STEP 6: Define Flow (Edges)
// ==============================
// - START → "solution"
// - "solution" → "judge"
// - "judge" → END


// ==============================
// STEP 7: Compile Graph
// ==============================
// - Call .compile()
// - Store graph in variable


// ==============================
// STEP 8: Create Main Function
// ==============================
// - Export default async function
// - Accept userMessage (string)
// - Call graph.invoke()
// - Pass messages: [new HumanMessage(userMessage)]
// - Store result


// ==============================
// STEP 9: Return Output
// ==============================
// - console.log(result) for debugging
// - return result.messages (or full result if needed)

export async function useGraph(message: string){
    const result = await graph.invoke({
        messages: [new HumanMessage(message)]
    })
   console.log('final result', result);
    return result.messages;
}
// ==============================
// FINAL FLOW (MENTAL MODEL)
// ==============================
// User Input
//    ↓
// STATE created
//    ↓
// solutionNode runs (2 AI answers)
//    ↓
// STATE updated
//    ↓
// judgeNode runs (compare + score)
//    ↓
// STATE updated
//    ↓
// END → return result
