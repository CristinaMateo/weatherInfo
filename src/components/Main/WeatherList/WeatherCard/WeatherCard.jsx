import React from 'react';

const WeatherCard = ({ data }) => {
  const { date, time, temperature, weather, wind } = data;

  return (
    <div className="weather-card">
      <h3>{new Date(date).toLocaleDateString()}</h3>
      <p>Hora: {time}</p>
      <p>Temperatura: {temperature}°C</p>
      <p>Tiempo: {weather}</p>
      <p>Viento: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;