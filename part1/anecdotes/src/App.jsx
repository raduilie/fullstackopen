import { useState } from 'react'

const randomIndex = (maxValue) => {
  return Math.floor(Math.random() * maxValue)
}

const Header = ({text}) => <h1>{text}</h1>

const voteForAnecdote = (votes, selectedAnecdote) => {
  let newVotes = [...votes]
  newVotes[selectedAnecdote] += 1
  return newVotes
}

const getIndexOfMostVotes = (votes) => {
  let maxIndex = 0
  for (let i = 1 ; i < votes.length ; i++) {
    if (votes[i] > votes[maxIndex]) {
      maxIndex = i
    }
  }
  return maxIndex
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initialVotes = Array.from({ length: anecdotes.length}, () => 0)
   
  const [selected, setSelected] = useState(randomIndex(anecdotes.length))
  const [votes, setVotes] = useState(initialVotes)
  const mostVotesIndex = getIndexOfMostVotes(votes)
  console.log(selected)
  console.log(votes)

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <p></p>
      <button onClick={() => setVotes(voteForAnecdote(votes, selected))}>vote</button>
      <button onClick={() => setSelected(randomIndex(anecdotes.length))}>next anecdote</button>
      <Header text="Anecdote with most votes"/>
      {anecdotes[mostVotesIndex]}
      <br></br>
      has {votes[mostVotesIndex]} votes
    </div>
  )
}

export default App
