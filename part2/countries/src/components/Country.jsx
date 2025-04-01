const Languages = ({languages}) => {
    return (
        languages.map((language) => 
            <li key={language[0]}>{language[1]}</li>
        )
    )
}

const Country = ({countryData}) => {
    if (countryData === null)
        return null

    const languages = Object.entries(countryData.languages)

    return (
        <div>
            <h1>{countryData.name.common}</h1>
            <div>Capital {countryData.capital[0]}</div>
            <div>Area {countryData.area}</div>
            <h2>Languages</h2>
            <ul>
            <Languages languages={languages} />
            </ul>
            <img src={countryData.flags.png}></img>
        </div>
    )

}

export default Country
