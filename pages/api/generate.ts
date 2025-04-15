import { generateCaption } from '../../lib/openai';
import { generateLlamaCaption } from '../../lib/llama';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, model = 'openai' } = req.body; // Default to OpenAI
    
    const caption = model === 'llama' 
      ? await generateLlamaCaption(prompt)
      : await generateCaption(prompt);

    res.status(200).json({ caption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Caption generation failed' });
  }
}