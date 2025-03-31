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
  const [notificationMessage, setNotificationMessage] = useState(null)

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
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    personsService.get(newName)
      .then((data) => {        
        if (data.length > 0) {
          console.log(`${newName} was found`)
          if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            return
          }
          const oldPerson = data[0]
          const newPerson = {name: newName, number: newNumber, id: oldPerson.id}
          personsService
            .update(newPerson)
            .then(returnedPerson => {
              const newPersons = persons.map(person => person.id == returnedPerson.id ? returnedPerson : person)
              setNotificationMessage(`Modified ${returnedPerson.name}`)
              updateStateAfter(newPersons)
            })
          }
        else {
          console.log(`${newName} was not found`)
          const newPerson = {name: newName, number: newNumber}
          personsService
            .create(newPerson)
            .then(returnedPerson => {
              setNotificationMessage(`Added ${returnedPerson.name}`)
              updateStateAfter(persons.concat(returnedPerson))
            })
        }
      })
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name} ?`))
      return
    personsService.deletePerson(person.id)
      .then((person) => {
        console.log(`${person.name} was deleted`)
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
      <Notification message={notificationMessage} />
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