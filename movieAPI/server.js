//* express 모듈을 끌어옴
const express = require('express');
//* 요약하면, axios는 HTTP 요청을 쉽게 처리하고 다룰 수 있게 해주는 라이브러리로, 웹 개발 및 데이터 통신 작업을 훨씬 간편하게 만들어 주기에 사용함
const axios = require('axios');
//* app이라는 변수로 express 를 정의해줌
const app = express();
const port = 3000; // 사용할 포트 번호

//* JSON 형식으로 데이터를 요청하면, 해당 데이터를 JavaScript 객체로 파싱하여 Express 애플리케이션 내에서 사용

app.use(express.json());
//* URL-encoded 데이터는 일반적으로 웹 폼에서 전송되며, 이를 JavaScript 객체로 파싱하여 사용 할 수 있게 함
// * { extended: true }는 좀 더 복잡한 데이터 구조를 지원하기 위한 옵션으로, 이를 true로 설정하면 좀 더 다양한 데이터를 처리할 수 있게 됩니다.

app.use(express.urlencoded({ extended: true }));

//* html 파일 가져오기 로직 
app.get('/', (req, res) => {
    // 클라이언트에게 HTML 파일 제공
    res.sendFile(__dirname + '/movie.html');
});

//* url이 /getMovieRanking 일 경우 실행
app.get('/getMovieRanking', async (req, res) => {
    try {
        //* 키 값
        const apiKey = '01b58ca5ef441a88d965d0816ffbc060';
        const targetDt = req.query.targetDt; // 클라이언트에서 날짜를 전달받음

        //* api 주소중 키 값 변수 targetDt는 사용자가 인풋에서 날짜 입력 시 적용
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
