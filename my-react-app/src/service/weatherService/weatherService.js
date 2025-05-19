import axios from 'axios';

const API_KEY = 'f9c834badf329c0d50ea036fd06e6d7e'; // Replace with your OpenWeatherMap API key

export async function  fetchWeather(temperatureType = 'celsius') {
  let units = 'metric'; // default Celsius
  if (temperatureType === 'fahrenheit') units = 'imperial';
  if (temperatureType === 'kelvin') units = 'standard';
  let city =  localStorage.getItem("defaultCity") ?? "Dhaka";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  return await axios.get(url);
}