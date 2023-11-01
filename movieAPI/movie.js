
// * document에 이벤트리스너 주로 웹 페이지가 완전히 로드되기를 기다리지 않고 JavaScript 코드를 실행하거나 초기화하는 데 사용

document.addEventListener("DOMContentLoaded", function() {
    //* 검색 버튼
    const searchButton = document.getElementById("search-button");
    // * 입력한 데이터 (날짜)
    const dateInput = document.getElementById("date-input");
    //* 영화의 리스트 데이터
    const movieList = document.getElementById("movie-list");
    //* 더보기 버튼
    const loadMoreButton = document.getElementById("load-more");
    let page = 1;
    
    // * 검색 버튼 이벤트 리스너 클릭시 
    searchButton.addEventListener("click", function() {
        page = 1; // 새로운 검색 시 페이지를 초기화합니다.

        // * 입력한 날짜 데이터 받아오기 
        const selectedDate = dateInput.value;
        // ! 입력한 날짜의 - (하이픈)을 제거 
        //* url의 데이터에서 하이픈이 없어야 하기에
        const selectedDateWithoutHyphens = selectedDate.replace(/-/g, "");
        //* selectedDate 참 일시 selectedDateWithoutHyphens를 로그에 출력
        if (selectedDate) {
            fetchMovieRanking(selectedDateWithoutHyphens);
            console.log(selectedDateWithoutHyphens);
        }
    });
    //* 더보기 버튼 이벤트리스너 클릭시 
    loadMoreButton.addEventListener("click", function() {
        page++; // 페이지를 증가시켜 더 많은 영화 목록을 가져옵니다.
        const selectedDate = dateInput.value;
        const selectedDateWithoutHyphens = selectedDate.replace(/-/g, "");
        
        //* selectedDateWithoutHyphens 결과 가 참일시 영화 랭킹을 불러온다.
        if (selectedDateWithoutHyphens) {
            fetchMovieRanking(selectedDateWithoutHyphens, page);
        }
    });

    //* 영화 랭킹 함수
    function fetchMovieRanking(selectedDateWithoutHyphens, page = 1) {
        // 올바른 API URL 생성
        const apiKey = '01b58ca5ef441a88d965d0816ffbc060';
        const apiUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${selectedDateWithoutHyphens}`;

        //*  apiUrl이라는 URL에서 데이터를 가져오는 HTTP 요청
        fetch(apiUrl)
        //* API가 JSON 형식으로 응답하면 이 부분이 그 데이터를 JavaScript 객체로 변환
            .then(response => response.json())
            .then(data => {
                if (page === 1) {
                    movieList.innerHTML = "";
                }
                displayMovieRanking(data);
            })
            .catch(error => {
                console.error("에러 발생: ", error);
            });
    }

    //* 영화 랭킹에 대한 함수 
    function displayMovieRanking(data) {

        //*조건이 실행 되기 위해선 data 데이터 객체가 있어야 하며 data.boxOfficeResult: data 객체 안에 boxOfficeResult라는 속성이 존재 해야하며 그 객체 안에 dailyBoxOfficeList라는 속성이 존재 해야 실행 됨

        if (data && data.boxOfficeResult && data.boxOfficeResult.dailyBoxOfficeList) {
            //* movies 은 일일박스오피스리스트이며 이것을 길이만큼 반복 
            const movies = data.boxOfficeResult.dailyBoxOfficeList;
    
            for (let i = 0; i < movies.length; i++) {
                //* div 생성 div textContent엔 길이의 순번을 +1 을 더하고 영화의 이름과 매출액을 나타낸다.
                const movie = movies[i];
                const listItem = document.createElement("div");
                listItem.textContent = `${i + 1}. ${movie.movieNm} (매출액: ${movie.salesAmt}원)`;
                movieList.appendChild(listItem);
            }
        } else {
            //* 실행 불가
            console.error("API 응답 데이터 구조가 변경되었거나, 데이터가 없습니다.");
        }
    }
});

