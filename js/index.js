let map;

function initMap() {
  let centerIndonesia = {
    lat: 3.597031,
    lng: 98.678513,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerIndonesia,
    zoom: 16,
  });
  getStores();
  createMarker();
}

const getStores = () => {
    const API_URL = 'http://localhost:3000/api/stores';
    fetch(API_URL)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    }).then((data) => {
      console.log(data);
    })
}


const createMarker = () => {
    var marker = new google.maps.Marker({
        position: {
          lat: 3.597031,
          lng: 98.678513,
        },
        map: map,
    });
}
