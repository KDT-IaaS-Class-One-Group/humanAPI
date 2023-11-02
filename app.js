// express 보더 더 커스텀 하기 위한 http
const http = require('http')
// 기본적인 서빙을 위한 express
const express = require('express')
// 간편하게 쓰기 위한 app 선언
const app = express();
// 파일 시스템을 쓰기위한 fs 선언
const fs = require('fs');
// 포트를 변수에 담음
const port = 3217;

//정적 파일을 서빙
app.use(express.static("static"));

// 데이터를 파싱하기 위한 선언 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// index res
app.get('/login', (req, res) =>{
  res.sendFile(__dirname + '/static/index.html')
})



app.post('/', (req, res)=>{
  const userid = req.body.userid;
  const userpw = req.body.userpw;

  const goodId = 'csm';
  const goodPw = '0177';

  if(userid === goodId && userpw=== goodPw){
    res.sendFile(__dirname + '/static/search.html')
  }
})



app.listen(port, () => {
  console.log(`
http://localhost:${port}
  `)
})



