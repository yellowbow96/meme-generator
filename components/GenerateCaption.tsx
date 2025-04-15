import { useState } from 'react';

interface GenerateCaptionProps {
  onGenerate: (prompt: string, model: 'openai' | 'llama') => Promise<void>;
  isLoading: boolean;
}

export default function GenerateCaption({
  onGenerate,
  isLoading,
}: GenerateCaptionProps) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<'openai' | 'llama'>('openai');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await onGenerate(prompt, model);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Model Selection */}
        <div>
          <label className="block mb-2 font-medium">AI Model</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                checked={model === 'openai'}
                onChange={() => setModel('openai')}
              />
              <span className="ml-2">GPT-4</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-purple-600"
                checked={model === 'llama'}
                onChange={() => setModel('llama')}
              />
              <span className="ml-2">LLaMA 3</span>
            </label>
          </div>
        </div>

        {/* Prompt Input */}
        <div>
          <label htmlFor="prompt" className="block mb-2 font-medium">
            Caption Prompt
          </label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your meme..."
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Generating...' : 'Generate Caption'}
        </button>
      </form>
    </div>
  );
}