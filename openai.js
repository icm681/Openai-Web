export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        headers: { "Content-Type": "application/json" },
        status: 405
      });
    }

    const url = "https://api.openai.com/v1/chat/completions";
    const apiKey = env.OPENAI_API_KEY; // Ambil API Key dari Environment Variables

    try {
      const requestBody = await request.json();
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      return new Response(JSON.stringify(responseData), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  }
};
