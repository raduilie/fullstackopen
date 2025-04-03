import axios from 'axios'
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = updatedPerson => {
    const url = `${baseUrl}/${updatedPerson.id}`
    const request = axios.put(url, updatedPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }