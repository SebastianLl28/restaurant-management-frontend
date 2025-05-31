import { useQuery } from '@tanstack/react-query'
import {
  getProductById,
  getProducts,
  getRelatedProducts
} from '../service/product.service'
import {
  PRODUCT_QUERY_KEY,
  PRODUCTS_QUERY_KEY,
  PRODUCTS_RELATED_QUERY_KEY
} from '@/config/keys'
import { IProductFilter } from '../interface/IProductFilter'

interface Props {
  filter: IProductFilter
}

export const useGetProducts = ({ filter }: Props) =>
  useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, filter],
    queryFn: () => getProducts({ filter }),
    staleTime: 1000 * 60 * 60 * 2
  })

export const useGetProductById = (id: number) =>
  useQuery({
    queryKey: [...PRODUCT_QUERY_KEY, id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60 * 2
  })

interface RelatedProp {
  productId: number
  customerId?: number
}

export const useGetRelatedProducts = ({ productId, customerId }: RelatedProp) =>
  useQuery({
    queryKey: [...PRODUCTS_RELATED_QUERY_KEY, { productId, customerId }],
    queryFn: () => getRelatedProducts({ productId, customerId }),
    staleTime: 1000 * 60 * 60 * 2,
    enabled: Boolean(productId)
  })
