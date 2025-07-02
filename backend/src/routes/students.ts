import { Router } from 'express';

const router = Router();

// Simple test route
router.get('/', (req, res) => {
  res.json({ message: 'Students route working!' });
});

export default router;