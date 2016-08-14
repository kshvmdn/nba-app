import express from 'express';
import morgan from 'morgan';

import api from './api';

let app = express();

app.use(morgan('dev'));
app.use('/api', api);

let port = process.env.PORT || 3001;
let address = process.env.ADDRESS || '127.0.0.1';

let server = app.listen(port, address, () => {
  console.log(`Listening @ http://${server.address().address}:${server.address().port}.`);
})

export default app;
