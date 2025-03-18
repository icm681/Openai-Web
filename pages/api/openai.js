import { OpenAI } from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Missing OpenAI API key" });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    try {
        const openai = new OpenAI({ apiKey });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7
        });

        return res.status(200).json({ response: response.choices[0].message });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}