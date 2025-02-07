import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import fetch from "node-fetch";
// Required for fetch in Node.js

config(); // Load environment variables from .env file

const app = express();

async function uploadFile(filePath) {
    try {
        const response = await axios.post(`${API_URL}/files`, fs.createReadStream(filePath), {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "multipart/form-data"
            },
            params: { purpose: "assistants" }
        });
        return response.data.id;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}

(async () => {
    const fileId = await uploadFile("Chicken_Information.pdf");
    if (fileId) {
        const response = await callGPTWithFile(fileId);
        console.log("ChickenGPT Response:", response);
    }
})();

// ✅ Allow requests from all origins (or specify allowed origins)
app.use(cors({
    origin: "*", // Replace with 'http://127.0.0.1:5500' for security
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}));
app.use(json());

const API_KEY = process.env.API_KEY; // Read from .env

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-0125",
                messages: [{ role: "user", content: userMessage }],
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));