const Countries = ({countries, setSelectedCountry}) => {
    const onClick = (country) => {
        setSelectedCountry(country)
    }

    const buttonStyle = {
        display: countries.length == 1 ? 'none' : 'inline'
    }

    return (
        countries.length <= 10
            ? countries.length > 1
                ? countries.map((country) => <div key={country}>{country} <button style={buttonStyle} onClick={() => onClick(country)}>Show</button></div>)
                : null
            : <div>Too many matches, specify another filter</div>
    )
}

export default Countries
