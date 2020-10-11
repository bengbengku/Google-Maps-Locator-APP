var map;
var infoWindow;

function initMap() {
  let centerIndonesia = {
    lat: 3.597031,
    lng: 98.678513,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerIndonesia,
    zoom: 14,
  });
  infoWindow = new google.maps.InfoWindow();
  getStores();
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
      searchLocationsNear(data);
    })
}

const searchLocationsNear = (stores) => {
  let bounds = new google.maps.LatLngBounds();

  stores.forEach((store, index) => {
    let latlng = new google.maps.LatLng(
      store.location.coordinates[1],
      store.location.coordinates[0]
    );
    let name = store.storeName;
    let address = store.addressLines[0];
    let phone = store.phoneNumber;
    let openStatusText = store.openStatusText;
    bounds.extend(latlng);
    createMarker(latlng, name, address, openStatusText, phone, index+1);
  });
  map.fitBounds(bounds);
}

const createMarker = (latlng, name, address, openStatusText, phone, storeNumber) => {
    let html=`
      <div class="store-info-window">
        <div class="store-info-name">
          ${name}
        </div>
        <div class="store-info-open-status">
          ${openStatusText=== "" ? 'Open until 6.00 PM' : 'Closed'}
        </div>
        <div class="store-info-address">
          <div class="icon">
            <i class="fas fa-location-arrow"></i>
          </div>
          <span>
            ${address}
          </span>
        </div>
        <div class="store-info-phone">
          <div class="icon">
            <i class="fas fa-phone-volume"></i>
          </div>
          <span>
           <a href="tel:${phone==null ? '(061) 80513222' : 'Data tidak ditemukan'}"> 
            ${phone==null ? '(061) 80513222' : 'Data tidak ditemukan'} 
           </a>
          </span>
        </div>
      </div>
    
    `;

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        label: `${storeNumber}`
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
}


