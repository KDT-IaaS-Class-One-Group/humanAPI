const MapApi = (mapDiv, map) => {
  mapDiv = document.getElementById("map");
  const mapOption = {
    center: new naver.maps.LatLng(36.34933, 127.3777),
    zoom: 15,
    mapTypeControl: true,
  };

  map = new naver.maps.Map("mapDiv", mapOption);
}

export { MapApi };