import { useState } from 'react'
import Countries from './Countries'

const Filter = ({allCountries, setSelectedCountry}) => {
    const [countriesFilter, setCountriesFilter] = useState('')

    const getCountriesToShow = (allCountries, countriesFilter) => {
        const lcCountriesFilter = countriesFilter.toLowerCase()
        return countriesFilter
            ? allCountries.filter(country => country.toLowerCase().includes(lcCountriesFilter))
            : []
    }

    const onFilterChange = (event) => {
        setCountriesFilter(event.target.value)
        const countriesToShow = getCountriesToShow(allCountries, event.target.value)
        if (countriesToShow.length == 1) {
            setSelectedCountry(countriesToShow[0])
        } else {
            setSelectedCountry(null)
        }
    }

    const countriesToShow = getCountriesToShow(allCountries, countriesFilter)

    return (
        <>
            <div>find countries <input value={countriesFilter} onChange={onFilterChange}></input></div>
            <Countries countries={countriesToShow} setSelectedCountry={setSelectedCountry} />
        </>
    )
}

export default Filter
