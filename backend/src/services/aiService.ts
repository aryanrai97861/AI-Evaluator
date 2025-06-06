import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Get the API key from environment variables
const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_AI_API_KEY is not defined in environment variables');
  throw new Error('API key for Google Generative AI is missing');
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

interface EvaluationResult {
  score: number;
  feedback: string;
}

type ContentPart = {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
};

export async function evaluateTask(
  name: string,
  code: string | undefined,
  screenshot: string | null
): Promise<EvaluationResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Construct the prompt for evaluation
    let prompt = `Please evaluate the following task "${name}"`;
    if (code) {
      prompt += `\n\nCode:\n${code}`;
    }
    prompt += '\n\nPlease provide:\n1. A score from 0-100\n2. Detailed feedback on the implementation';

    // Prepare the content parts
    const contentParts: Part[] = [
      { text: prompt }
    ];

    // Add screenshot if available
    if (screenshot) {
      contentParts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: screenshot
        }
      });
    }

    // Generate evaluation
    const result = await model.generateContent(contentParts);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract score and feedback
    const scoreMatch = text.match(/score:?\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
    
    // Remove the score line from feedback
    const feedback = text.replace(/score:?\s*\d+/i, '').trim();

    return {
      score,
      feedback
    };
  } catch (error) {
    console.error('Error in AI evaluation:', error);
    throw new Error('Failed to evaluate task using AI');
  }
}