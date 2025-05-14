// import { fetchMarkersData } from './getMarkers';
import mapStyle from './map-style';

export default function googleMap() {
  window.initMap = function initMap() {
    maps.forEach((mapElement, index) => {
      // ...
    });
  };
}

async function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    let key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=ua`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    window.initMap = () => resolve();
    document.head.appendChild(script);
  });
}

const mapContainers = document.querySelectorAll('.map');
const observerOptions = {
  rootMargin: '0px',
  threshold: 0.1,
};

mapContainers.forEach(container => {
  const observer = new IntersectionObserver(async (entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        obs.unobserve(container);
        await loadGoogleMapsScript();
        createMap(container);
      }
    }
  }, observerOptions);

  observer.observe(container);
});

function createMap(container) {
  const gmarkers = [];
  const center = {
    lat: 49.2330266,
    lng: 28.3977645,
  };

  const choosedCategories = new Set();
  choosedCategories.add('main');

  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(container, {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'ua',
    styles: mapStyle(),
  });

  const filterMarkers = function(categoriesArray) {
    gmarkers.forEach(el => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };

  filterItems.forEach(item => {
    item.addEventListener('click', evt => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers(choosedCategories);
    });
  });

  const baseFolder = '/wp-content/themes/3d/assets/images/map/';
  const defaultMarkerSize =
    document.documentElement.clientWidth < 1600
      ? new google.maps.Size(46, 80)
      : new google.maps.Size(56, 90);
  const buildLogoSize = new google.maps.Size(82, 82);

  const markersAdresses = {
    main: `${baseFolder}main.png`,
    mall: `${baseFolder}mall.svg`,
    park: `${baseFolder}park.svg`,
    pharmacy: `${baseFolder}pharmacy.svg`,
    restaurant: `${baseFolder}restaurant.svg`,
    school: `${baseFolder}school.svg`,
    sport: `${baseFolder}sport.svg`,
    supermarket: `${baseFolder}supermarket.svg`,
    drivingSchool: `${baseFolder}driving-school.svg`,
    post: `${baseFolder}post.svg`,
    aquapark: `${baseFolder}aquapark.svg`,
    petrolStation: `${baseFolder}petrol-station.svg`,
    busStop: `${baseFolder}bus-stop.svg`,
    carWashing: `${baseFolder}car-washing.svg`,
  };

  const markersData = [
    {
      type: 'main',
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      position: { lat: 49.2281991, lng: 28.3926229 },
      text: 'ЖК Twins м. Вінниця, вул. Келецька, 123-А',
    },
  ];

  const infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
  markersData.forEach(marker => {
    const mapMarker = new google.maps.Marker({
      map,
      category: marker.type,
      animation: google.maps.Animation.DROP,
      zIndex: marker.zIndex || 1,
      icon: marker.icon,
      cursor: 'grab',
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function() {
      infowindow.setContent(marker.text);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });

    mapMarker.name = marker.type;
    gmarkers.push(mapMarker);
  });
}
