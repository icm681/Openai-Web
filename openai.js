export default {
  async fetch(request, env) {
    console.log("Request received:", request.method);

    if (request.method !== "POST") {
      console.log("Invalid method:", request.method);
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        headers: { "Content-Type": "application/json" },
        status: 405
      });
    }

    console.log("Processing request...");
    const url = "https://api.openai.com/v1/chat/completions";
    const apiKey = env.OPENAI_API_KEY;

    try {
      const requestBody = await request.json();
      console.log("Request body:", requestBody);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log("OpenAI response:", responseData);

      return new Response(JSON.stringify(responseData), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  }
};
