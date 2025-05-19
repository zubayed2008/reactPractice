import { useContext, useEffect, useState } from 'react';
import { TemperatureContext } from '../../component/temperatureContext/temperatureContext.jsx';
import { fetchWeather } from '../../service/weatherService/weatherService.js';
import { formatTime } from '../../utils/timeUtils.js';
import { windKmh } from '../../utils/distanceUtils.js';
import { getCityFromLocation } from '../../service/geoLocation/geoLocatonService.js';
import cityList from '../../assets/city_json/city.list.json';

function Home() {
    const { temperatureType } = useContext(TemperatureContext);
    const [weather, setWeather] = useState(null);
    const [ temperatureSign , setTemperatureSign] = useState(null);
    const [city, setCity] = useState(() => localStorage.getItem("defaultCity") || "Dhaka");

    useEffect(() => {
    fetchWeather(temperatureType)
      .then(response => setWeather(response.data))
      .catch(error => console.error(error));
    }, [city,temperatureType]);

    useEffect(() => {
        if (temperatureType === 'celsius') {
            setTemperatureSign('°C');
        } else if (temperatureType === 'fahrenheit') {
            setTemperatureSign('°F');
        } else if (temperatureType === 'kelvin') {
            setTemperatureSign('K');
        }
    }, [temperatureType]);

    const handleDetectAndSetCity = async () => {
        const cityName = await getCityFromLocation();
        if (cityName) {
        // Find city object from your city list (import cityList if needed)
        const cityObj = cityList.find(
            c => c.name.toLowerCase() === cityName.toLowerCase()
        );
        if (cityObj) {
            localStorage.setItem("defaultCity", cityObj.name);
            localStorage.setItem("defaultCityId", cityObj.id);
            setCity(cityObj.name);
        } else {
            localStorage.setItem("defaultCity", cityName);
            setCity(cityName);
        }
        }
    };


    return ( 
        <>
            <div className="card card-primary mb-3 bg-primary text-white">
                <div className="card-body text-center ">
                    <div className="card-title">Welcome to weather App!</div>
                    <div className="card-text">
                        {weather ? (
                            <>
                                <table className="table table-borderless">
                                    <tbody>
                                    <tr>
                                        <td>🌍 Country :</td>
                                        <td>{weather.sys.country}</td>
                                    </tr>
                                    <tr>
                                        <td>🌆 City : </td>
                                        <td>{weather.name}</td>
                                    </tr>
                                    <tr>
                                        <td>🌡️ Temperature : </td>
                                        <td>{weather.main.temp} {temperatureSign}</td>
                                    </tr>
                                    <tr>
                                
                                        <td>🤗 Feels Like : </td>
                                        <td>{weather.main.feels_like} {temperatureSign}</td>
                                    </tr>
                                    <tr>
                                        <td>🌤️ Situation :</td>
                                        <td>{weather.weather[0].main} ({weather.weather[0].description})</td>
                                    </tr>
                                    <tr>
                                        <td>💨 Wind :</td>
                                        <td>{
                                    temperatureType === 'fahrenheit'
                                    ? `${weather.wind.speed} mph`
                                    : `${windKmh(weather.wind.speed)} km/h`
                                }</td>
                                    </tr>
                                    {/* <tr>
                                        <td>🌫️ Condition :</td>
                                        <td>{weather.weather[0].description}</td>
                                    </tr> */}
                                    <tr>
                                        <td>🌅 Sunrise :</td>
                                        <td>{formatTime(weather.sys.sunrise)}</td>
                                    </tr>
                                    <tr>
                                        <td>🌇 Sunset :</td>
                                        <td>{formatTime(weather.sys.sunset)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>

            <button
                className="btn btn-info mb-3"
                onClick={handleDetectAndSetCity}
                >
                Detect & Set My City as Default
            </button>

            <div className='row'>
                <div className='col-12'>
                    <label htmlFor='jsonData'>JSON Result</label>
                    <textarea className='form-control' id='jsonData' rows='10' value={JSON.stringify(weather, null, 2)} readOnly></textarea>
                </div>
            </div>
        </>
     );
}

export default Home;