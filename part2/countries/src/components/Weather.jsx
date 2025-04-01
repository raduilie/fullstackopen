const baseUrl = 'https://openweathermap.org/img/wn'

const Weather = ({countryData, weatherData}) => {
    if (countryData === null || weatherData === null)
        return null
    const temperatureCelsius = weatherData.main.temp - 273.15
    const iconCode = weatherData.weather[0].icon
    const wxIconUrl = `${baseUrl}/${iconCode}@2x.png`
    return (
        <>
            <h2>Weather in {countryData.capital[0]}</h2>
            <div>Temperature {temperatureCelsius.toFixed(2)} Celsius</div>
            <div><img src={wxIconUrl}></img></div>
            <div>Wind {weatherData.wind.speed} m/s</div>
        </>
    )
}

export default Weather
