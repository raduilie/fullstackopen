const Countries = ({countries}) => {
    return (
        countries.length <= 10
            ? countries.length >= 1
                ? countries.map((country) => <div key={country}>{country}</div>)
                : null
            : <div>Too many matches, specify another filter</div>
    )
}

export default Countries
