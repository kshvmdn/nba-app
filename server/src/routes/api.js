import express from 'express';
import getFreeAgentData from '../helpers/get-free-agent-data';

const router = express.Router();

router.get('/:year', (req, res, next) => {
  getFreeAgentData(req.params.year)
    .then((response) => {
      response.meta.status = 200;
      response.meta.message = 'OK';

      res.json(response);
    })
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  res.json({
    endpoints: {
      full: '/:year',
      by_name: '/:year/:name',
      by_old_team: '/:year/:team',
      by_new_team: '/:year/:team'
    },
    meta: {
      status: 200,
      message: 'OK'
    },
  });
});

export default router;
