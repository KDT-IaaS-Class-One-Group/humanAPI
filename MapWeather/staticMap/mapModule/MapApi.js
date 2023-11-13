const MapApi = (mapDiv, map) => {
  mapDiv = document.getElementById("map");
  const mapOption = {
    center: new naver.maps.LatLng(37.3595316, 127.1052133),
    zoom: 15,
    mapTypeControl: true,
  };

  map = new naver.maps.Map("mapDiv", mapOption);
}

export { MapApi };