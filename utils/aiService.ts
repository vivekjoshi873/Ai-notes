import { AISummaryResponse } from '@/types';

/**
 * Calls the AI API to generate a summary of the note content
 * Uses Next.js API route to keep the OpenAI API key secure
 * 
 * @param content - The note content to summarize
 * @returns Promise with the summary or error message
 */
export async function summarizeNote(content: string): Promise<AISummaryResponse> {
  try {
    // Check if content is empty
    if (!content.trim()) {
      return {
        summary: '',
        error: 'Note content is empty. Please add some content before summarizing.',
      };
    }

    // Call our Next.js API route (which keeps the API key server-side)
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        summary: '',
        error: data.error || 'Failed to generate summary. Please try again.',
      };
    }

    return {
      summary: data.summary || 'No summary generated',
    };
  } catch (error) {
    console.error('Error calling AI API:', error);
    return {
      summary: '',
      error: error instanceof Error ? error.message : 'Failed to generate summary. Please try again.',
    };
  }
}

/**
 * Mock function for testing without an actual AI API
 * Remove this and use the actual summarizeNote function in production
 */
export async function mockSummarizeNote(content: string): Promise<AISummaryResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!content.trim()) {
    return {
      summary: '',
      error: 'Note content is empty.',
    };
  }

  // Generate a simple mock summary
  const words = content.split(/\s+/).length;
  const lines = content.split('\n').length;
  
  return {
    summary: `This note contains approximately ${words} words across ${lines} lines. It discusses various topics related to the content you've written. The main themes include the ideas expressed in the markdown text. This is a mock summary - replace with actual AI API call.`,
  };
}

