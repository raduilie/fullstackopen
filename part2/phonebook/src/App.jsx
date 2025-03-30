import { useState } from 'react'

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
      <form onSubmit={filterPersons}>
        <div>filter shown with <input value={nameFilter} onChange={handleNameFilterChange}></input></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App