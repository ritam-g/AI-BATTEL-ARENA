import express from 'express'

const app = express()

/**  
 * Health check endpoint to verify that the server is running.
 * @description This endpoint can be used by monitoring tools to check the health of the application. It returns a simple JSON response with a status of 'ok' if the server is running properly.
 * @route GET /health
 * @returns {Object} 200 - An object containing the status of the server
 */
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: "server is running fine" });
})


export default app