import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IProduct {
  id: number
  name: string
  imageUrl: string
  price: number
  stock: { store: string; quantity: number }[]
  description: string
}

export interface IProductstore extends IProduct {
  quantity: number
}

interface ICartStore {
  items: IProductstore[]
  addItem: (item: IProduct, number?: number) => void
  removeItem: (item: IProduct) => void
  findItem: (id: number) => IProductstore | undefined
  setQuantity: (id: number, quantity: number) => void
  deleteItem: (id: number) => void
}

const useCartStore = create(
  persist<ICartStore>(
    (set, get) => ({
      items: [],
      addItem: (item, number = 1) => {
        set(state => {
          const index = state.items.findIndex(i => i.id === item.id)
          if (index === -1) {
            return { items: [...state.items, { ...item, quantity: number }] }
          }
          state.items[index].quantity += number
          return { items: [...state.items] }
        })
      },
      removeItem: item => {
        set(state => {
          const index = state.items.findIndex(i => i.id === item.id)
          if (index === -1) {
            return { items: [...state.items] }
          }
          if (state.items[index].quantity > 1) {
            state.items[index].quantity--
            return { items: [...state.items] }
          }
          return { items: state.items.filter(i => i.id !== item.id) }
        })
      },
      findItem: id => {
        return get().items.find(i => i.id === id) || undefined
      },
      setQuantity: (id, quantity) => {
        set(state => {
          const index = state.items.findIndex(i => i.id === id)
          if (index === -1) {
            return { items: [...state.items] }
          }
          state.items[index].quantity = quantity
          return { items: [...state.items] }
        })
      },
      deleteItem: id => {
        set(state => {
          return { items: state.items.filter(i => i.id !== id) }
        })
      }
    }),
    { name: 'cart-store' }
  )
)

export default useCartStore
