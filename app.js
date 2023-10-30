const clientId = 'YOUR_CLIENT_ID'; // 네이버 개발자 포털에서 발급한 Client ID
const clientSecret = 'YOUR_CLIENT_SECRET'; // 네이버 개발자 포털에서 발급한 Client Secret

const query = '검색어'; // 검색하고자 하는 단어나 문장

const url = `https://openapi.naver.com/v1/search/encyc.json?query=${query}`;

fetch(url, {
  method: 'GET',
  headers: {
    'X-Naver-Client-Id': clientId,
    'X-Naver-Client-Secret': clientSecret,
  },
})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('API 호출 실패');
    }
  })
  .then(data => {
    // API 응답을 처리하는 코드 작성
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
