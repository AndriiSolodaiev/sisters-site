import { swiperMap } from '../../gulp-modules';
import mapStyle from './map-style';

export default async function googleMap() {
  const mapContainers = document.querySelectorAll('.map');
  const mapSingle = document.querySelector('.map-simple');

  if (!mapContainers.length && !mapSingle) return;

  // 👇 Завантаження скрипта Google Maps
  async function loadGoogleMapsScript() {
    if (window.google && window.google.maps) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const key = ''; // 🔑 Підстав сюди свій ключ
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&language=ua`;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Не вдалося завантажити Google Maps API'));
      document.head.appendChild(script);
    });
  }

  // 👇 Ініціалізація мапи після завантаження API
  async function initMaps() {
    await loadGoogleMapsScript();

    if (mapContainers.length) {
      mapContainers.forEach(container => {
        createMap(container);
      });
    }

    if (mapSingle) {
      createSingleMap(mapSingle);
    }
  }

  // 👇 IntersectionObserver для відкладеного завантаження
  const observerOptions = { rootMargin: '0px', threshold: 0.1 };

  const observerCallback = async (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer.disconnect(); // зупиняємо спостереження
        await initMaps();
        break;
      }
    }
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const firstMap = mapContainers[0] || mapSingle;
  if (firstMap) {
    observer.observe(firstMap);
  }

  // 👇 Додатково — якщо карта вже в viewport
  if (isElementInViewport(firstMap)) {
    observer.disconnect();
    await initMaps();
  }

  if (isElementInViewport(mapSingle)) {
    observer.disconnect();
    await initMaps();
  }
  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // 👇 Основна карта з категоріями
  function createMap(container) {
    const gmarkers = [];
    const center = {  lat: 50.4133804,
      lng: 30.6017674, };
    const choosedCategories = new Set(['main']);

    const filterItems = document.querySelectorAll('[data-marker]');
    const map = new google.maps.Map(container, {
      zoom: 14.5,
      center,
      scrollwheel: false,
      mapTypeControl: false,
      draggable: true,
      styles: mapStyle(),
    });

  const baseFolder = window.location.href.match(/localhost/)
    ? './assets/images/map/'
    : '/wp-content/themes/3d/assets/images/map/';
  const defaultMarkerSize =
    document.documentElement.clientWidth < 1600
      ? new google.maps.Size(46, 80)
      : new google.maps.Size(56, 90);
  const buildLogoSize = new google.maps.Size(82, 82);

  const markersAdresses = {
    main: `${baseFolder}main.png`,
    mall: `${baseFolder}mall.svg`,
    park: `${baseFolder}park.svg`,
    garden: `${baseFolder}garden.svg`,
    activities: `${baseFolder}activities.svg`,
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
    // {
    //   type: 'school',
    //   icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
    //   position: { lat: 50.4159854, lng: 30.6017674 },
    //   text: 'Київська інженерна гімназія',
    // },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.4085242, lng: 30.6155671 },
      text: 'Школа №329 "Логос" імені Георгія Гонгадзе',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 50.4133804, lng: 30.6017674 },
      text: 'Школа №111 ім.',
    },

    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 50.408161, lng: 30.6180979 },
      text: 'Амбулаторія №2, КНП "ЦПМСД" Дарницького району',
    },
    {
      type: 'garden',
      icon: { url: markersAdresses.garden, scaledSize: defaultMarkerSize },
      position: { lat: 50.4090848, lng: 30.6147314 },
      text: 'Заклад дошкільної освіти №245 "Перевесло"',
    },
    {
      type: 'garden',
      icon: { url: markersAdresses.garden, scaledSize: defaultMarkerSize },
      position: { lat: 50.4105531, lng: 30.6237973 },
      text: 'Заклад дошкільної освіти №550',
    },
    {
      type: 'garden',
      icon: { url: markersAdresses.garden, scaledSize: defaultMarkerSize },
      position: { lat: 50.4039349, lng: 30.6196789 },
      text: 'Заклад дошкільної освіти №215 "Веселка" імені Тимофія Лубенця',
    },
    {
      type: 'garden',
      icon: { url: markersAdresses.garden, scaledSize: defaultMarkerSize },
      position: { lat: 50.4032358, lng: 30.6176958 },
      text: 'Заклад дошкільної освіти №315',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 50.4075086, lng: 30.613431 },
      text:
        'Sport Life Дніпровська Набережна: тренажерний зал, басейн, дитячий басейн, кардіозал, йога, пілатес, СПА, лазня, бокс',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 50.4080717, lng: 30.6177778 },
      text: 'Басейн "Крокі"',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.4073413, lng: 30.6090698 },
      text: 'Жар і мʼясо',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.4034401, lng: 30.6141626 },
      text: 'Villa Riviera restaurant',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 50.4036578, lng: 30.6156313 },
      text: 'Чорноморка Княжий Затон',
    },
    {
      type: 'activities',
      icon: { url: markersAdresses.activities, scaledSize: defaultMarkerSize },
      position: { lat: 50.4085377, lng: 30.6009236 },
      text: 'Парк Прибережний',
    },
    {
      type: 'activities',
      icon: { url: markersAdresses.activities, scaledSize: defaultMarkerSize },
      position: { lat: 50.4051347, lng: 30.6122473 },
      text: 'ТРЦ River Mall',
    },
    {
      type: 'activities',
      icon: { url: markersAdresses.activities, scaledSize: defaultMarkerSize },
      position: { lat: 50.3988538, lng: 30.6167684 },
      text: 'ТК Аркадія',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 50.4112046, lng: 30.6057162 },
      text: 'NOVUS',
    },
    {
      type: 'main',
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      position: { lat: 50.4159854, lng: 30.6017674 },
      text: 'ЖК Sister м. Київ, вул. вулиця Клеманська, 3',
    },
  ];

  const infowindow = new google.maps.InfoWindow({ maxWidth: 300 });

  markersData.forEach(marker => {
    const mapMarker = new google.maps.Marker({
      map,
      position: marker.position,
      icon: marker.icon,
      category: marker.type,
      animation: google.maps.Animation.DROP,
    });

    mapMarker.addListener('click', () => {
      infowindow.setContent(marker.text);
      infowindow.open(map, mapMarker);
      map.panTo(marker.position);
    });

    gmarkers.push(mapMarker);
  });

  filterItems.forEach(item => {
    item.addEventListener('click', evt => {
      evt.preventDefault();
      item.classList.toggle('active');
      const category = item.dataset.category;
      if (item.classList.contains('active')) {
        choosedCategories.add(category);
      } else {
        choosedCategories.delete(category);
      }

      gmarkers.forEach(marker => {
        if (choosedCategories.has(marker.category) || choosedCategories.size === 1) {
          marker.setMap(map);
          marker.setAnimation(google.maps.Animation.DROP);
        } else {
          marker.setMap(null);
        }
      });

      swiperMap.update();
    });
  });
}

// 👇 Проста мапа для одного маркера
function createSingleMap(container) {
  const center = { lat: 50.4108375148184,  lng: 30.599973593881256 };
  const markerIcon = {
    url: window.location.href.includes('localhost')
      ? './assets/images/map/riel.svg'
      : '/wp-content/themes/3d/assets/images/map/riel.svg',
    scaledSize:
      document.documentElement.clientWidth < 1600
        ? new google.maps.Size(80, 80)
        : new google.maps.Size(90, 90),
  };

  const map = new google.maps.Map(container, {
    zoom: 15,
    center,
    scrollwheel: false,
    mapTypeControl: false,
    draggable: true,
    styles: mapStyle(),
  });

  const marker = new google.maps.Marker({
    position: center,
    map,
    icon: markerIcon,
    animation: google.maps.Animation.DROP,
  });

  const infowindow = new google.maps.InfoWindow({
    content: 'РІЕЛ – відділ продажу',
    maxWidth: 300,
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
    map.panTo(center);
  });
}
}