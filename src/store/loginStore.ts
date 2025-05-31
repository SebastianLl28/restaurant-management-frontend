import { create } from 'zustand'

interface CustomerStore {
  username: string
  id: number
}

interface LoginStore {
  user: CustomerStore | null
  setUser: (user: CustomerStore) => void
  clearUser: () => void
}

// TODO: Save more data in the store, to make payments
export const useLoginStore = create<LoginStore>(set => ({
  user: null,
  setUser: (user: CustomerStore) => set({ user }),
  clearUser: () => set({ user: null })
}))
