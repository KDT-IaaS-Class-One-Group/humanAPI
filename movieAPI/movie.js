document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const dateInput = document.getElementById("date-input");
    const movieList = document.getElementById("movie-list");
    const loadMoreButton = document.getElementById("load-more");
    let page = 1;
    
    
    searchButton.addEventListener("click", function() {
        page = 1; // 새로운 검색 시 페이지를 초기화합니다.
        const selectedDate = dateInput.value;
        const selectedDateWithoutHyphens = selectedDate.replace(/-/g, "");
        if (selectedDate) {
            fetchMovieRanking(selectedDateWithoutHyphens);
            console.log(selectedDateWithoutHyphens);
        }
    });
    
    loadMoreButton.addEventListener("click", function() {
        page++; // 페이지를 증가시켜 더 많은 영화 목록을 가져옵니다.
        const selectedDate = dateInput.value;
        const selectedDateWithoutHyphens = selectedDate.replace(/-/g, "");
        
        if (selectedDateWithoutHyphens) {
            fetchMovieRanking(selectedDateWithoutHyphens, page);
        }
    });

    function fetchMovieRanking(selectedDateWithoutHyphens, page = 1) {
        // 올바른 API URL 생성
        const apiKey = '01b58ca5ef441a88d965d0816ffbc060';
        const apiUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${selectedDateWithoutHyphens}`;
    
        fetch(apiUrl)
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
    function displayMovieRanking(data) {
        if (data && data.boxOfficeResult && data.boxOfficeResult.dailyBoxOfficeList) {
            const movies = data.boxOfficeResult.dailyBoxOfficeList;
            for (let i = 0; i < movies.length; i++) {
                const movie = movies[i];
                const listItem = document.createElement("div");
                listItem.textContent = `${i + 1}. ${movie.movieNm} (매출액: ${movie.salesAmt}원)`;
                movieList.appendChild(listItem);
            }
        } else {
            console.error("API 응답 데이터 구조가 변경되었거나, 데이터가 없습니다.");
        }
    }
});

