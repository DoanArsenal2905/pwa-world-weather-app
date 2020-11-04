import React, { useEffect, useState } from 'react'

import { fetchWeather } from '../api/fetchWeather'

const Weather = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState({})

  if (localStorage.getItem('location') === null) {
    localStorage.setItem('location', JSON.stringify({}))
  }
  
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
        placeholder='Search City ...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {(location.main || (weather.main && location === {})) ? (
        <div className='city'>
          <h2 className='city-name'>
            <span>{location.name || weather.name}</span>
            <sup>{location.sys.country || weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(location.main.temp || weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${location.weather[0].icon || weather.weather[0].icon}@2x.png`}
              alt={location.weather[0].description || weather.weather[0].description}
            />
            <p>{location.weather[0].description || weather.weather[0].description}</p>
          </div>
        </div>
      ) : (
        <div className='city'>
          <p style={{ fontWeight: 'bold' }}>Oops!! <span role='img' aria-label='shock-monkey'>🌈</span> No city detected yet!! <span role='img' aria-label='smile-tear'>⛅ ☔ 🌂⛄</span></p>
        </div>
      )}
      <div className='footer'>
        <p>Made by Ngo Quoc Doan <span role='img' aria-label='smile-tear'>&#128526;</span><span role='img' aria-label='smile-tear'>&#128526;</span></p>
      </div>
    </div>
  )
}

export default Weather