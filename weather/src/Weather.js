import React, { useEffect, useState } from "react";
import Search from "./Search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false)
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    try {
      const respone = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      );
      if(!respone.ok) throw new Error('No data')
      const data = await respone.json();
      if (data) {
        setWeatherData(data);
        setError(false)
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true)
      console.log(e);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(search);
    setSearch('')
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-us',{
        weekday:'long',
        month:'long',
        day:'numeric',
        year:'numeric'
    })
  }

  useEffect(() => {
    fetchWeatherData("bangalore");
  }, []);
  console.log(weatherData);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="loading"> Loading...</div>
      ) : error? <h1 style={{display:'flex', justifyContent:'center', marginTop:'8rem',fontSize:'4rem'}}>No data</h1> : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name},<span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div>
            <div className="date">
              <span>{getCurrentDate()}</span>
            </div>
            <div className="temp">{weatherData?.main?.temp}</div>
            <p className="description">
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].description
                : ""}
            </p>
            <p>
              <div className="weather-info">
                <div className="column">
                  <div>
                    <p>{weatherData?.wind?.speed}</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
                <div className="column">
                  <div>
                    <p className="humidity">{weatherData?.main?.humidity}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
