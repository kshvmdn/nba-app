import { Router } from 'express';
import getFreeAgentData from '../utils/get-free-agent-data';

const router = new Router();

router.get('/list/:year', (req, res, next) => {
  getFreeAgentData(req.params.year, (err, resp) => {
    if (err) return next(err);

    res.json(resp);
  });
});

export default router;
