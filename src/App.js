import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
function App() {
  // weather state hooks
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  // const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const fetchWeather = async () => {};

  const toDatefunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCity("");

      const emptySpace = city.trim();
      if (!emptySpace) {
        return;
      }

      setWeather({ ...weather, loading: true });
      const URL = "https://api.openweathermap.org/data/2.5/weather";
      const api_Key = "f00c38e0279b7bc85480c3fe775d518c";
      await axios
        .get(URL, { params: { q: city, units: "metric", appid: api_Key } })
        .then((res) => {
          console.log("res:", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setCity("");
          console.log("error:", error);
        });
    }
  };

  // Updated Weather App Component for changed bg color based on weather
  const getWeatherClass = () => {
    if (!weather.data.weather) return '';
    const condition = weather.data.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear':
        return 'weather-clear';
      case 'clouds':
        return 'weather-clouds';
      case 'rain':
      case 'drizzle':
        return 'weather-rain';
      case 'snow':
        return 'weather-snow';
      case 'thunderstorm':
        return 'weather-thunderstorm';
      default:
        return '';
    }
  };

  // weather app render
  return (
    <div className={`App ${getWeatherClass()}`}>
      <h1 className="app-name">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter City Name"
          name="query"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
          // disabled={!city} // disabled search button until city name is entered
          required
          onKeyPress={search}
        />
        {/* <button onClick={fetchWeather} className="search-btn">
          Search
        </button> */}
      </div>
      {weather.loading && (
        <div className="loading">
          <div className="spinner">
            <div className="spinner-inner"></div>
          </div>
        </div>
      )}
      {weather.error && (
        <span className="error">
          <span className="error-icon">
            <FontAwesomeIcon icon={faFrown} size="3x" />
          </span>
          <p>City not found</p>
        </span>
      )}

      {weather && weather.data && weather.data.main && (
        <div className="weather-info">
          <div className="city-name">
            <h2>
              {weather.data.name},<span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="weather-data">
            <span>{toDatefunction()}</span>
          </div>
          <div className="temp-data">
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <span className="deg">{weather.data.main.temp}°C</span>
          </div>
          <div className="dec-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind: {weather.data.wind.speed} m/s</p>
          </div>
        </div>
      )}

      {!city.trim() && !weather.data.weather && (
        <div className="empty-space">
          <h3>Please enter a city name.</h3>
          <p>
            You can search for a city by typing its name in the search bar
            above.
          </p>
          <p>Press Enter to get the weather information.</p>
          <p>
            <b>Thanks for using my weather app!</b>
          </p>
          <p className="developer-info">
            Developed by{" "}
            <a
              href="https://github.com/Gokulakrishnane11"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gokulakrishnan
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
