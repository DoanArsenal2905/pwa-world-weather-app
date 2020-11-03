import React, { useEffect, useState } from 'react'

import { fetchWeather } from '../api/fetchWeather'

const Weather = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState({})
  
  const search = async e => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query)
      setWeather(data)
      localStorage.setItem('location', JSON.stringify(data))
      setQuery('')
    }
  }

  useEffect(() => {
    const getStorage = async () => {
      const getLocation = JSON.parse(localStorage.getItem('location'))
      setLocation(getLocation)
    }
    getStorage()
  }, [weather])
  
  return (
    <div className='main-container'>
      <input
        type='text'
        className='search'
        placeholder='Search...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {location.main && (
        <div className='city'>
          <h2 className='city-name'>
            <span>{location.name}</span>
            <sup>{location.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(location.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`} alt={location.weather[0].description} />
            <p>{location.weather[0].description}</p>
          </div>
        </div>
      )}
      <div className='footer'>
        <p>Made by Ngo Quoc Doan <span role='img' aria-label='smile-tear'>&#128526;</span><span role='img' aria-label='smile-tear'>&#128526;</span></p>
      </div>
    </div>
  )
}

export default Weather