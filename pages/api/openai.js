import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!process.env.OPENAI_API_KEY) {
        console.error("Missing OpenAI API key");
        return res.status(500).json({ error: "Missing OpenAI API key" });
    }

    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Invalid request format" });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        });

        res.status(200).json(response);
    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
