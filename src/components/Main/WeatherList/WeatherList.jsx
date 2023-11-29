import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from "./WeatherCard";
import { v4 as uuidv4 } from 'uuid';

const WeatherList = () => {
  const [city, setCity] = useState("Madrid");
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=5111179d8b863c7c9d6d5b977a924b21`);
        const forecastJson = forecastRes.data;

        // Procesar los datos del pronóstico extendido
        const processedData = forecastJson.list.map(item => ({
          date: item.dt * 1000, // Convertir la fecha a milisegundos
          time: item.dt_txt.split(' ')[1], // Obtener la hora de la cadena de fecha
          temperature: item.main.temp,
          weather: item.weather[0].main,
          wind: item.wind,
        }));

        setForecastData(processedData);
      } catch (error) {
        console.error("Error fetching weather data", error);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [city]);

  const handleSubmit = e => {
    e.preventDefault();
    const newCity = e.target.location.value.trim();
    if (newCity) {
      setCity(newCity);
    }
  };

  return (
    <section>
      <h4>Búsqueda por ubicación</h4>
      <form onSubmit={handleSubmit}>
        <input name="location" placeholder='Ciudad, País' />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}

      {forecastData.length !== 0 ? (
        <div className='weather-list'>
          {forecastData.map((data, index) => (
            <WeatherCard key={index} data={data} />
          ))}
        </div>
      ) : (
        !loading && <p>No se encontraron datos para la ciudad especificada.</p>
      )}
    </section>
  );
};

export default WeatherList;