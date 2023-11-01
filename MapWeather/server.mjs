// app.mjs

import express from 'express';
import path from 'path'; // path 모듈 추가

const app = express();
const port = 7070;

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'MapWeather')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'MapWeather', 'Map.html'));
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
