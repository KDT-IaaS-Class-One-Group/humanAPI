// API 키를 자신의 네이버 개발자 포털에서 발급받은 키로 변경하세요.
const id = '_bYVaIBaPHNCSbVNe7Y4';
const secret = 'DcssvgMc9J';

document.getElementById('searchButton').addEventListener('click', searchNaverAPI);

async function searchNaverAPI() {
  const query = prompt('검색어를 입력하세요:');
  if (!query) {
    return;
  }

  try {
    const response = await fetch(`https://openapi.naver.com/v1/search/webkr.json?query=${query}`, {
      headers: {
        'X-Naver-Client-Id': id,
        'X-Naver-Client-Secret': secret,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      displayResults(data.items);
    } else {
      console.error('API 호출 실패: ' + response.status);
    }
  } catch (error) {
    console.error('에러 발생: ' + error);
  }
}

function displayResults(items) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  items.forEach(item => {
    const resultItem = document.createElement('div');
    resultItem.innerHTML = `
      <p><strong>${item.title}</strong></p>
      <p>${item.link}</p>
    `;
    resultsDiv.appendChild(resultItem);
  });
}