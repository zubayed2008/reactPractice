import { useContext } from "react";
import { TemperatureContext } from "../../component/temperatureContext/temperatureContext.jsx";

function WeatherSetting() {
    const { temperatureType, setTemperatureType } = useContext(TemperatureContext);

    return ( 
        <>
            <div className="card card-primary mb-3 bg-primary text-white">
                <div className="card-body text-center ">
                    <div className="card-title">Welcome to weather App!</div>
                    <div className="card-text">
                        <div className="form-group">
                            <label htmlFor="temperatureType">Select Temperature Unit</label>
                            <select className="form-control" id="temperatureType"
                            value={temperatureType}
                            onChange={e => setTemperatureType(e.target.value)}>
                                <option value="celsius">Celcius (&deg;C)</option>
                                <option value="fahrenheit">Fahrenheit (&deg;F)</option>
                                <option value="kelvin">Kelvin (K)</option>
                            </select>
                        </div>  
                    </div>
                </div>
            </div>
        </>
     );
}

export default WeatherSetting;