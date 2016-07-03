import express from 'express';
import getFreeAgentData from '../helpers/get-free-agent-data';

const router = express.Router();

router.get('/:year', (req, res, next) => {
  res.send(`GET /${req.params.year}`)
})

router.get('/:year/by/name/:name', (req, res, next) => {
  res.send(`GET /${req.params.year}/by/name/${req.params.name}`)
});

router.get('/:year/by/old_team/:team', (req, res, next) => {
  res.send(`GET /${req.params.year}/by/old_team/${req.params.team}`)
});

router.get('/:year/by/new_team/:team', (req, res, next) => {
  res.send(`GET /${req.params.year}/by/new_team/${req.params.team}`)
});

router.get('/', (req, res, next) => {
  res.json({
    endpoints: {
      full: '/:year',
      by_name: '/:year/by/name/:name',
      by_old_team: '/:year/by/old_team/:team',
      by_new_team: '/:year/by/new_team/:team'
    },
    meta: {
      status: 200,
      message: 'OK'
    },
  });
});

export default router;
