import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const summarizeText = async (text: string) => {
  const response = await api.post('/summarize', { text });
  return response.data;
};
