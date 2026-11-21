import { useAnecdoteActions } from "../store"

const Filter = () => {
  const { setFilter } = useAnecdoteActions()

  const handleChange = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
    console.log( e.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return(
    <div style={style}>
      filter <input type='text' data-testid="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter