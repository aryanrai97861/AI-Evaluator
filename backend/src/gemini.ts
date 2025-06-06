import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function summarizeText(inputText: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Summarize the following text:\n\n${inputText}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const summary = response.text();

  return summary;
}
