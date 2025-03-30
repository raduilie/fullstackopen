const Filter = ({onSubmit, onChange, value}) => {
    return (
        <form onSubmit={onSubmit}>
        <div>filter shown with <input value={value} onChange={onChange}></input></div>
      </form>
    )
}

export default Filter
