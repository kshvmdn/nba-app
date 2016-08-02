import { Router } from 'express';
import api from './api';

const router = Router();

router.use('/api', api);

router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Unexpected Error';

  res.status(status).json({
    error: { status, message }
  });
});

export default router;
