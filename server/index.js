const express = require('express');
const app = express();
const cors = require('cors');
/**dotenv 설정 */
const dotenv = require('dotenv');
dotenv.config({
  path: '../.env',
});

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log('server port open', process.env.PORT);
});
