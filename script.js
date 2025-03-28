document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const weatherCard = document.querySelector('.weather-card');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = '3de2d43585fda8e857d2ec530720fe35';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
    
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });
    
    async function fetchWeatherData(city) {
        try {
            const response = await fetch(`${API_URL}${city}`);
            if (!response.ok) throw new Error('Şehir bulunamadı');
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            showError();
            console.error('Hata:', error);
        }
    }
    
    function displayWeather(data) {
        const weatherEmoji = getWeatherEmoji(data.weather[0].main);
        
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = Math.round(data.main.temp);
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `${data.wind.speed} km/s`;
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        document.getElementById('weather-icon').textContent = weatherEmoji;
        
        weatherCard.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
    
    function showError() {
        weatherCard.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
    
    function getWeatherEmoji(weather) {
        switch(weather.toLowerCase()) {
            case 'clear': return '☀️'; // Güneşli
            case 'clouds': return '☁️'; // Bulutlu
            case 'rain': return '🌧️'; // Yağmurlu
            case 'snow': return '❄️'; // Karlı
            default: return '🌈'; // Diğer
        }
    }
});