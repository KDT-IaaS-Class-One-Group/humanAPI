import requests

api_url = "https://openapi.naver.com/v1/search/encyc.json"
query = "검색어"  # 검색하고자 하는 단어나 문장

headers = {
    "X-Naver-Client-Id": "_bYVaIBaPHNCSbVNe7Y4",
    "X-Naver-Client-Secret": "DcssvgMc9J"
}

params = {
    "query": query
}

response = requests.get(api_url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    # API 응답을 처리하는 코드 작성
else:
    print("API 호출 실패: ", response.status_code)

