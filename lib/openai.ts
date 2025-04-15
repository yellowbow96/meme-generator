import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function generateCaption(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",  // or "gpt-3.5-turbo"
      messages: [
        {
          role: "user",
          content: `Generate a funny meme caption about: ${prompt}. Keep it under 20 words.`,
        },
      ],
    });
    return completion.choices[0]?.message?.content || "Failed to generate caption";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "API error - check logs";
  }
}