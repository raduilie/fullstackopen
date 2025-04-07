import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState({message: null, color: 'green'})

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const updateStateAfter = (newPersons) => {
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
    setTimeout(() => setNotification({message: null, color: 'green'}), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name == newName)
    if (existingPerson) {        
      console.log(`${newName} was found`)
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
      const newPerson = {name: newName, number: newNumber, id: existingPerson.id}
      personsService
        .update(newPerson)
        .then(returnedPerson => {
          console.log(`returnedPerson: ${returnedPerson.name}, ${returnedPerson.number}`)
          const newPersons = persons.map(person => person.id === returnedPerson.id ? returnedPerson : person)
          setNotification({message: `Modified ${returnedPerson.name}`, color: 'green'})
          updateStateAfter(newPersons)
        })
        .catch((error) => {
          setNotification({
            message: `Failed to update ${newName}: ${error.response.data.error}`,
            color: 'red'})
          //const newPersons = persons.filter(person => person.id !== newPerson.id)
          //updateStateAfter(newPersons)
        })
    } else {
      console.log(`${newName} was not found`)
      const newPerson = {name: newName, number: newNumber}
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setNotification({message: `Added ${returnedPerson.name}`, color: 'green'})
          updateStateAfter(persons.concat(returnedPerson))
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotification({message: error.response.data.error, color: 'red'})
        })
    }
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name} ?`))
      return
    personsService.deletePerson(person.id)
      .then(() => {
        personsService.getAll().then((persons) => setPersons(persons))
      })
      .catch((error) => {alert(`Failed to delete ${person.name}: ${error}`)})
  }

  const filterPersons = (event) => {
    event.preventDefault()
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} color={notification.color} />
      <Filter onSubmit={filterPersons} onChange={handleNameFilterChange} value={nameFilter} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onChangeName={handleNameChange}
        numberValue={newNumber}
        onChangeNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons nameFilter={nameFilter} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App