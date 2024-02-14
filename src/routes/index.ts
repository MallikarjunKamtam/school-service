 
import express from 'express';
import studentRoutes from './students';
 

const router = express.Router();

router.use('/api', studentRoutes);
 

export default router;
