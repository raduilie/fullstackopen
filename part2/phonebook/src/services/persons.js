import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const get = name => {
    const request = axios.get(`${baseUrl}/?name=${encodeURIComponent(name)}`)
    return request
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

export default { getAll, get, create, deletePerson }