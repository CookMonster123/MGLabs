export async function onRequestPost(context) {
  try {
    if (!context.env.AI) {
      return Response.json({ error: 'Cloudflare Workers AI binding "AI" is not configured.' }, { status: 503 });
    }
    const body = await context.request.json();
    const message = String(body?.message || '').slice(0, 12000);
    const system = String(body?.system || 'You are the MGLabs assistant. Be accurate, helpful, concise, and student-friendly.').slice(0, 4000);
    if (!message.trim()) return Response.json({ error: 'Message is required.' }, { status: 400 });
    const result = await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [{ role: 'system', content: system }, { role: 'user', content: message }]
    });
    const reply = result?.response || result?.result?.response || '';
    return Response.json({ reply: String(reply) });
  } catch (error) {
    return Response.json({ error: error?.message || 'AI request failed.' }, { status: 500 });
  }
}
