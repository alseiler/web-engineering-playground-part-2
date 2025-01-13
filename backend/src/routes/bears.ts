import express from 'express';
import { fetchBears } from '../controllers/bearsController';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bears = await fetchBears();
    res.json(bears);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bears data' });
  }
});

export default router;
