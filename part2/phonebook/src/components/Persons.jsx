const Persons = ({nameFilter, persons, deletePerson}) => {
    const lcNameFilter = nameFilter.toLowerCase()
    const personsToShow = nameFilter
        ? persons.filter(person => person.name.toLowerCase().includes(lcNameFilter))
        : persons
    return (
        personsToShow.map((person) =>
            <div key={person.id}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person)}>delete</button>
            </div>
        )
    )
}

export default Persons
