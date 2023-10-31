const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // 사용할 포트 번호

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // 클라이언트에게 HTML 파일 제공
    res.sendFile(__dirname + '/movie.html');
});

app.get('/getMovieRanking', async (req, res) => {
    try {
        const apiKey = '01b58ca5ef441a88d965d0816ffbc060';
        const targetDt = req.query.targetDt; // 클라이언트에서 날짜를 전달받음

        const apiUrl = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${targetDt}`;
        
        // 외부 API에 요청을 보내 데이터 가져오기
        const response = await axios.get(apiUrl);

        // API 응답을 클라이언트에 전달
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: '데이터를 가져오는 중에 오류가 발생했습니다.' });
    }
});
app.get('/movie.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/movie.js');
});


app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
