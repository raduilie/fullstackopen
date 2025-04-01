import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import wxService from './services/weather'
import Country from './components/Country'
import Filter from './components/Filter'
import Weather from './components/Weather'

function App() {
  const [allCountries, setAllCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCountryData, setSelectedCountryData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countriesService.getAll().then(countries => {
      const returnedCountries = countries.map(country => country.name.common)
      setAllCountries(returnedCountries)
    })
  }, [])

  useEffect (() => {
    if (selectedCountry === null) {
      setSelectedCountryData(null)
      setWeatherData(null)
      return
    }
    countriesService.get(selectedCountry).then(data => {
      console.log(selectedCountry, {...data})
      setSelectedCountryData(data)
      wxService.getWeather(data.capitalInfo.latlng[0], data.capitalInfo.latlng[1]).then(data => {
        setWeatherData(data)
      })
    })    
  }, [selectedCountry])

  if (!allCountries)
    return

  return (    
    <div>
      <Filter allCountries={allCountries} setSelectedCountry={setSelectedCountry} />
      <Country countryData={selectedCountryData} />
      <Weather countryData={selectedCountryData} weatherData={weatherData} />
    </div>
  )
}

export default App
