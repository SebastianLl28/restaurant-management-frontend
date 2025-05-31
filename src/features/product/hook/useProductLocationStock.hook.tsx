import { PRODUCT_LOCATION_STOCK_QUERY_KEY } from '@/config/keys'
import { useQuery } from '@tanstack/react-query'
import { getProductLocationStockByProductIdAndLocationId } from '../service/productLocationStock.service'

export interface GetProductLocationStockProps {
  productId: number | undefined
  locationId: number | undefined
}

export const useGetProductLocationStock = ({
  productId,
  locationId
}: GetProductLocationStockProps) =>
  useQuery({
    queryKey: [...PRODUCT_LOCATION_STOCK_QUERY_KEY, {productId, locationId}],
    queryFn: () =>
      getProductLocationStockByProductIdAndLocationId({
        locationId,
        productId
      }),
    enabled: productId !== undefined && locationId !== undefined,
    staleTime: 1000 * 60 * 5
  })
