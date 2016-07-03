import express from 'express';
import api from './api';

const router = express.Router();

router.use('/api', api);

router.get('/', (req, res, next) => {
  res.json({
    endpoints: {
      api: '/api'
    },
    meta: {
      status: 200,
      message: 'OK'
    }
  })
})

export default router;
