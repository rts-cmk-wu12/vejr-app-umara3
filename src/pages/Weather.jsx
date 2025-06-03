



import { useState } from "react";


const apiKey = "d698c6b6dda012d9111aa1c6963da237"; 

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");

      
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        setError("City not found");
        return;
      }

      const { lat, lon, name } = geoData[0];

      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        temp: weatherData.main.temp,
        icon: weatherData.weather[0].icon,
        description: weatherData.weather[0].description,
      });
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="input-field"
      />
      <button onClick={getWeather} className="search-button">Search</button>
      {error && <p className="error-text">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
            alt={weather.description}
          />
          <p>{weather.description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

