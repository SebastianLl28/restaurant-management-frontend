import { Location } from '@/model/Location.model'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocationSelectedStore {
  selected: Location | null
  setSelected: (location: Location | null) => void
  openModal: boolean
  setOpenModal: (open: boolean) => void
}

export const useLocationSelectedStore = create(
  persist<LocationSelectedStore>(
    set => ({
      selected: null,
      setSelected: location => set({ selected: location }),
      openModal: false,
      setOpenModal: open => set({ openModal: open })
    }),
    {
      name: 'location-selected-store'
    }
  )
)
