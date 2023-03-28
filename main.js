const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('.error');
const date = document.querySelector('.date');
const cityName = document.querySelector('.city_name');
const img = document.querySelector('img');
const temperature = document.querySelector('.temperature');
const temperatureDesc = document.querySelector('.description');
const feelsLike = document.querySelector('.feels_like');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const wind_speed = document.querySelector('.wind_speed');
const clouds = document.querySelector('.clouds');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
// You must get and assing your own api Key from openweather.com to apiKey variable
const apiKey = '';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';




function getWeather(){
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang
    console.log(URL);

    axios.get(URL).then(response => {
        console.log(response.data);       

        img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        date.textContent = `${new Date((parseInt(response.data.dt, 10) + parseInt(response.data.timezone, 10))* 1000).toUTCString()}`;
        cityName.textContent =`${response.data.name}, ${response.data.sys.country}`;
        temperature.textContent =`${Math.round(response.data.main.temp)} °C`;
        temperatureDesc.textContent =`${response.data.weather[0].description}`;
        temperatureDesc.classList.add('orange');
        feelsLike.textContent =`${Math.round(response.data.main.feels_like)} °C`;
        humidity.textContent =`${response.data.main.humidity} %`;
        pressure.textContent =`${response.data.main.pressure} hPa`;
        wind_speed.textContent =`${(Math.round(response.data.wind.speed)) * 3.6} km/h`;
        clouds.textContent = `${response.data.clouds.all} %`;

        errorMsg.textContent = '';

    }).catch(error => {
        console.log(error)

        if(error.response.data.cod !== '200'){
            errorMsg.textContent = `${error.response.data.message}`
        }

        [clouds, wind_speed, pressure, humidity, feelsLike, 
            temperatureDesc, temperature, cityName, date].forEach(el => {
                el.textContent ='';
        })
        img.src = '';
        temperatureDesc.classList.remove('orange');

    }).finally(() =>{
        input.value = '';
    });
}

button.addEventListener('click', getWeather);
