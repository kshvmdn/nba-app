import express from 'express';
const app = express();

import routes from './routes';
const port = process.env.PORT || 3000;

app.use('/', routes);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;

  let response = {
    data: null,
    meta: {
      status: err.status,
      message: err.message
    }
  };

  res.status(err.status).json(response);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}.`));

export default app;
