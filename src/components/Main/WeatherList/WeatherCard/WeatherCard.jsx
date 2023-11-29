import React from 'react';

const WeatherCard = ({ data }) => {
  const { date, time, temperature, weather, wind } = data;

  return (
    <article className="weather-card">
      <h5>{new Date(date).toLocaleDateString()}</h5>
      <p>Hora: {time}</p>
      <p>Temperatura: {temperature}°C</p>
      <p>Tiempo: {weather}</p>
      <p>Viento: {wind.speed} m/s</p>
    </article>
  );
};

export default WeatherCard;