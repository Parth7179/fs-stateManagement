import { useAnecdotes, useAnecdoteActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { addVote, deleteAnecdote } = useAnecdoteActions()


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
            { !(anecdote.votes>0?true:false) && <button onClick={() => deleteAnecdote(anecdote.id)} > Delete</button> }
            
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
