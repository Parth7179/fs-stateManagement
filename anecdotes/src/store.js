import { create } from 'zustand'
import anecdoteService from './Services/anecdotes'
const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter:'',

  actions: {

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({anecdotes}))
    },

    addAnecdote: async (anecdote) => {
      const ane = await anecdoteService.createNew(anecdote)
      set( state => ({anecdotes: state.anecdotes.concat(ane)}))
    },

    addVote: id =>  set(
      state => ({
        anecdotes: state.anecdotes.map(
          anecdote => anecdote.id === id? {...anecdote, votes: anecdote.votes + 1}: anecdote
        ).toSorted((a,b) => b.votes - a .votes)
      })
    ),
    
    setFilter: value => set(() => ({ filter: value }))
  },
}))


export const useAnecdotes = () => {
  const filter =  useAnecdoteStore(state => state.filter)
  const anecdotes = useAnecdoteStore(state => state.anecdotes)

  return anecdotes.filter(anecdote => (anecdote.content.toLowerCase().includes(filter.toLowerCase())))
}
export const useAnecdoteActions = () => useAnecdoteStore( (state) => state.actions)
