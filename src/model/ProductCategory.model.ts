import { Category } from './Category.model'

export interface ProductCategory {
  id: number
  category: Category
  categoryId: number
  productId: number
}
