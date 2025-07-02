import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Test route working!', timestamp: new Date() });
});

export default router;