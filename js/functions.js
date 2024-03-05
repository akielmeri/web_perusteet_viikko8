const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_span = document.querySelector('img');
const city_span = document.querySelector('#city');

const url = 'https://api.openweathermap.org/data/2.5/weather?';
const icon_url = 'https://openweathermap.org/img/wn/';
const api_key = 'e173ce58edbb3e776012e609e7bebe20';


const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude.toFixed(3);
            const lon = position.coords.longitude.toFixed(3);
            document.querySelector('#lat').innerHTML = lat + ', ';
            document.querySelector('#lon').innerHTML = lon;

            getWeather(lat, lon);
        }, (error) => {
            alert('Error getting location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};


const getWeather = (lat, lon) => {
    const address = `${url}lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    console.log(`Attempting to fetch weather data from: ${address}`);
    axios.get(address)
        .then(response => {
            const json = response.data;
            temp_span.innerHTML = json.main.temp.toFixed(1) + '&#8451;';
            speed_span.innerHTML = json.wind.speed.toFixed(1) + ' m/s';
            direction_span.innerHTML = json.wind.deg + '&#176;';
            description_span.innerHTML = capitalizeFirstLetter(json.weather[0].description);
            const image = icon_url + json.weather[0].icon + '@2x.png';
            icon_span.src = image;
            const city = json.name + ', ' + json.sys.country;
            city_span.innerHTML = city;
        }).catch(error => {
            alert(error);
        })
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

getLocation();