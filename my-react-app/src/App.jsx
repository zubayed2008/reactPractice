import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './component/nav/nav.jsx'
import Home from './pages/home/home.jsx'
import WeatherSetting from './pages/weather-setting/weatherSetting.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { TemperatureProvider } from './component/temperatureContext/temperatureContext.jsx'
import City from './pages/city/city.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div>
          <Nav />
          <TemperatureProvider>
            <div className="container mt-4">
              <Routes>
                  <Route path="/" element={ <Home /> } />
                  <Route path="/weather-setting" element={<WeatherSetting />} />
                  <Route path="/city" element={<City />} />
                  
              </Routes>
              <p className="read-the-docs">
                In progress app
              </p>
            </div>
          </TemperatureProvider>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
