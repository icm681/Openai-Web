import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Pastikan API Key tersedia
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Missing OpenAI API key" });
    }

    // Validasi request body
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    try {
        // Inisialisasi OpenAI
        const openai = new OpenAI({ apiKey });

        // Mengirim permintaan ke OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Pastikan model benar
            messages: messages,
            temperature: 0.7
        });

        // Mengembalikan respons ke frontend
        return res.status(200).json({ message: response.choices?.[0]?.message?.content || "No response" });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}