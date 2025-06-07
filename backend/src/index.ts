import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import summarizeRoutes from './routes/summarize'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', summarizeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
