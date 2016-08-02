import { Router } from 'express';
import getFreeAgentData from './utils/get-free-agent-data';

const router = new Router();

router.get('/list/:year', (req, res, next) => {
  getFreeAgentData(req.params.year, (err, resp) => {
    if (err) return next(err);

    res.json(resp);
  });
});

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
