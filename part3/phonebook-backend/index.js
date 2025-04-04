const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
morgan.token('person', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Please provide both name and number'
        })
    }

    const existingPerson = persons.find(person => person.name === body.name)
    if (existingPerson) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).send(`Person with id ${id} does not exist`).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== request.params.id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const date = new Date(Date.now())
    response.send(`<div>Phonebook has info for ${persons.length} people</div><div>${date.toString()}</div>`).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
