// app.mjs

import express from 'express';

const app = express();
const port = 7070;

app.get('/', (req, res) => {
  res.send('ESM Express 서버가 실행 중입니다.');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
