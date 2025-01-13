import express from 'express';
import cors from 'cors';
import bearsRouter from './routes/bears';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bears', bearsRouter);

// Start Server
const PORT = process.env.PORT != null || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
