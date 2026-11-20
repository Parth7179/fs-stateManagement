import { create } from 'zustand'
import anecdoteService from './Services/anecdotes'
const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter:'',

  actions: {

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({anecdotes: anecdotes.toSorted((a,b) => b.votes - a.votes)}))
    },

    addAnecdote: async (anecdote) => {
      const ane = await anecdoteService.createNew(anecdote)
      set( state => ({anecdotes: state.anecdotes.concat(ane)}))
    },
    addVote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update( id, {...anecdote, votes: anecdote.votes+1 })

      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id? updated: a).toSorted((a,b) => b.votes - a.votes)
      }))
    },

    setFilter: value => set(() => ({ filter: value }))
  },
}))


export const useAnecdotes = () => {
  const filter =  useAnecdoteStore(state => state.filter)
  const anecdotes = useAnecdoteStore(state => state.anecdotes)

  return anecdotes.filter(anecdote => (anecdote.content.toLowerCase().includes(filter.toLowerCase())))
}
export const useAnecdoteActions = () => useAnecdoteStore( (state) => state.actions)
