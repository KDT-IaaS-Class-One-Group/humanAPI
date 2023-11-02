// app.mjs
const express = require('express');
const path = require('path');

const app = express();
const port = 7070;

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'Map')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'staticMap/Map.html'));
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
