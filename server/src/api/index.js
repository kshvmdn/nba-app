import { Router } from 'express';
import getFreeAgentData from './utils/get-free-agent-data';

const router = new Router();

router.get('/list/:year', (req, res, next) => {
  getFreeAgentData(req.params.year, (err, resp) => {
    if (err) return next(err);

    res.status(201).json(resp);
  });
});

router.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  let response = {
    status = err.status || 500,
    message = err.message || 'Unexpected Error'
  };

  res.status(response.status).json({ error: response })
});

export default router;
