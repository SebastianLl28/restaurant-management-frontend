import { ProductCategory } from './ProductCategory.model'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  cardImage: string
  status: boolean
  detailImage: string
  valoration: number
  categoryList: string[]
  productCategoryList: ProductCategory[]
  productGalleryList: ProductGallery[]
}

export interface ProductGallery {
  id: number
  productId: number
  imageUrl: string
}

/**
 * @deprecated
 */
export interface ProductStock extends Product {
  stock: {
    store: string
    quantity: number
  }[]
}

export interface ProductDetail extends Product {
  reviewList: Review[]
}

export interface Review {
  comment: string
  score: number
  fullName: string
}
