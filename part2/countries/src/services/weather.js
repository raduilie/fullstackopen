import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_WX_API_KEY

const getWeather = (latitude, longitude) => {
    const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { getWeather }
