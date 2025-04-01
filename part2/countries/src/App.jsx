import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Country from './components/Country'
import Filter from './components/Filter'

function App() {
  const [allCountries, setAllCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCountryData, setSelectedCountryData] = useState(null)

  useEffect(() => {
    countriesService.getAll().then(countries => {
      const returnedCountries = countries.map(country => country.name.common)
      setAllCountries(returnedCountries)
    })
  }, [])

  useEffect (() => {
    if (selectedCountry === null) {
      setSelectedCountryData(null)
      return
    }
    countriesService.get(selectedCountry).then(data => {
      console.log(selectedCountry, {...data})
      setSelectedCountryData(data)
    })
  }, [selectedCountry])

  if (!allCountries)
    return

  return (    
    <div>
      <Filter allCountries={allCountries} setSelectedCountry={setSelectedCountry} />
      <Country countryData={selectedCountryData} />
    </div>
  )
}

export default App
