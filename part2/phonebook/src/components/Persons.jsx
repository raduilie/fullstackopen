const Persons = ({nameFilter, persons}) => {
    const lcNameFilter = nameFilter.toLowerCase()
    const personsToShow = nameFilter
        ? persons.filter(person => person.name.toLowerCase().includes(lcNameFilter))
        : persons
    return (
        personsToShow.map((person) => <div key={person.id}>{person.name} {person.number}</div>)
    )
}

export default Persons
