// In your parent component (e.g., index.tsx)
const handleGenerate = async (prompt: string, model: 'openai' | 'llama') => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      });
      const data = await res.json();
      setCaption(data.caption);
    } catch (error) {
      console.error('Generation failed:', error);
      setCaption('Failed to generate caption');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Usage in your JSX:
  <GenerateCaption 
    onGenerate={handleGenerate} 
    isLoading={isLoading} 
  />