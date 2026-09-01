const MODEL = "@cf/meta/llama-3.2-3b-instruct";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, model: MODEL, service: "Cloudflare Workers AI" });
    }

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();
        const incoming = Array.isArray(body.messages) ? body.messages : [];

        const messages = incoming
          .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
          .slice(-12)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

        if (!messages.length || messages[messages.length - 1].role !== "user") {
          return Response.json({ error: "A user message is required." }, { status: 400 });
        }

        const result = await env.AI.run(MODEL, {
          messages: [
            {
              role: "system",
              content: "You are a helpful, concise AI assistant. Answer clearly and accurately. If you are unsure, say so."
            },
            ...messages
          ],
          max_tokens: 700,
          temperature: 0.6
        });

        return Response.json({
          message: result.response || "I couldn't generate a response.",
          model: MODEL
        });
      } catch (error) {
        return Response.json({ error: "AI request failed. Please try again." }, { status: 500 });
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  }
};
