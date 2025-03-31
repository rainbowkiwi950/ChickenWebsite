
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import fetch from "node-fetch";
import { promises as fsPromises } from "fs"; // Use fs.promises for async/await

// Required for dotenv to load environment variables from .env file
config();

const app = express();

// Allow requests from all origins (or specify allowed origins for security)
app.use(cors({
    origin: "http://127.0.0.1:5500", // Replace with 'http://127.0.0.1:5500' for security
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(json());

const API_KEY = process.env.API_KEY; // Read from .env

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        // Use fs.promises.readFile for async/await
        const data = await fsPromises.readFile('instructions.txt', 'utf8');

        // Make the API request with the file content as the system message
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",  // Ensure the model name is correct
                messages: [
                    { role: "system", content: data }, // Insert text file content here
                    { role: "user", content: userMessage }
                ],
            }),
        });

        const dataResponse = await response.json();
        res.json(dataResponse); // Return the API response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Endpoint to generate questions based on the selected topic
app.post('/generate-questions', async (req, res) => {
    const { topic } = req.body;

    // Define the prompt to ask the GPT model to generate questions for the selected topic
    const prompt = `Generate 5 questions about ${topic} for a quiz. Each question should have 4 multiple-choice answers.`;

    try {
        // Make a request to the OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",  // Ensure the model name is correct
                messages: [
                    { role: "user", content: prompt }
                ],
                max_tokens: 200,
                temperature: 0.7,
                n: 1
            })
        });

        const dataResponse = await response.json();
        console.log(dataResponse);
        res.json(dataResponse.choices[0].message.content.trim().split('\n')); // Return the API response
    } catch (error) {
        console.error("Error generating questions: ", error);
        res.status(500).json("Error generating questions.");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
