export async function generateLlamaCaption(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LLAMA_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-70b-instruct', // or other LLaMA variant
          messages: [{
            role: 'user',
            content: `Generate a viral meme caption about: ${prompt}. Max 15 words.`
          }]
        })
      });
  
      const data = await response.json();
      return data.choices[0]?.message?.content || "LLaMA failed to generate caption";
    } catch (error) {
      console.error("LLaMA API error:", error);
      return "API error - check logs";
    }
  }