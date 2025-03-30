import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filterPersons = (event) => {
    event.preventDefault()
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const lcNameFilter = nameFilter.toLowerCase()
  const personsToShow = nameFilter
    ? persons.filter(person => person.name.toLowerCase().includes(lcNameFilter))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSubmit={filterPersons} onChange={handleNameFilterChange} value={nameFilter} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onChangeName={handleNameChange}
        numberValue={newNumber}
        onChangeNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons nameFilter={nameFilter} persons={persons} />
    </div>
  )
}

export default App