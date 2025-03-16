export default {
    async fetch(request, env, ctx) {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
                status: 405,
                headers: { "Content-Type": "application/json" },
            });
        }

        try {
            const requestBody = await request.json();

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: requestBody.messages,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: "A server error occurred." }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    }
};