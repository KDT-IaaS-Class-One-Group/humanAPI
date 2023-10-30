async function fetchData() {
  try {
    // 비동기 작업을 수행하고 완료될 때까지 기다립니다.
    const response = await fetch('https://www.naver.com/data');

    if (response.status === 200) {
      // JSON 데이터를 파싱하고 결과를 반환합니다.
      const data = await response.json();
      return data;
    } else {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }
  } catch (error) {
    // 에러 처리
    console.error(error);
    return null;
  }
}

// fetchData 함수는 Promise를 반환하므로 .then()을 사용하여 결과를 처리할 수 있습니다.
fetchData()
  .then(data => {
    if (data) {
      console.log('데이터를 성공적으로 가져왔습니다:', data);
    } else {
      console.log('데이터 가져오기 실패');
    }
  });