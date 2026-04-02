import express from 'express'
import runGraph from './ai/graph.ai.js'


const app = express()


app.use(express.json())

// normal route for tesing graph ai
app.get('/', async function (req, res) {
    const result = await runGraph('How to make a perfect cup of tea?')
    res.json(result)
})
export default app