import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useFeedbackStore = create(set => ({
  good: 0,
  bad: 0,
  neutral: 0,
  actions: {
    addGood: () => set(state => ({ good: state.good + 1 })),
    addBad: () => set(state => ({ bad: state.bad + 1 })),
    addNeutral: () => set(state => ({ neutral: state.neutral + 1 })),
  }
}))

export const useValues = () => useFeedbackStore(
  useShallow((state) => ({
    good: state.good,
    bad: state.bad,
    neutral: state.neutral,
  }))
)
export const useControls = () => useFeedbackStore(state => state.actions)