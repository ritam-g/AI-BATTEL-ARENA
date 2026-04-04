// This is the main server file for the backend. 
// It initializes the Express application and sets up API routes.
import express from 'express'
import runGraph from './ai/graph.ai.js'
import cors from 'cors'
import morgan from "morgan";
const app = express()

// This line allows our server to read JSON data sent in requests.
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST']
}))
app.use(morgan('combined'))
// This is a test route to check if the AI graph logic is working correctly.
// When you visit the main domain (e.g., localhost:4000), it runs a tea-making prompt.
app.get('/', async function (req, res) {
    const result = await runGraph('How to make a perfect cup of tea?')
    res.json(result)
})
// ! make one route for user input and one route for AI response
app.post('/compare', async function (req, res) {
    try {
        const { userInput } = req.body
        const result = await runGraph(userInput)
        return res.status(200).json({
            result:result
        })
    } catch (error) {

    }
})
export default app