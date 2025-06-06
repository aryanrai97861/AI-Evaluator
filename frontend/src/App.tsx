import { useState } from 'react';
import { summarizeText } from './api';
import { motion } from 'framer-motion';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setSummary('');
    try {
      const result = await summarizeText(inputText);
      setSummary(result.outputText);
    } catch (error) {
      setSummary('Error summarizing text. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5,delay: 0.5 }}
        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
      >
        🧠 AI Text Evaluator
      </motion.h1>

      <motion.textarea
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 ,delay: 0.5}}
        className="w-full max-w-3xl p-4 border border-gray-700 rounded-lg shadow-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6
                   bg-gray-900 text-gray-100 backdrop-blur-sm hover:shadow-xl 
                   transition-all duration-300"
        rows={10}
        placeholder="Paste your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSummarize}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 
                   rounded-full font-semibold shadow-lg hover:shadow-xl 
                   transition-all duration-300 disabled:from-gray-700 
                   disabled:to-gray-800 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3,delay: 0.5 }}
          >
            Evaluating....
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3,delay: 0.5 }}
          >
            {loading ? 'Evaluating...' : 'Evaluate Text'}
          </motion.span>
          
        )}
      </motion.button>

      {summary && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay: 0.3 }}
          className="mt-8 w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-xl 
                     hover:shadow-2xl transition-all duration-300 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Summary:</h2>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{summary}</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;
