import { useParams } from 'react-router-dom'
import { useGetProductById } from '../../hook/useProduct.hook'
import { useEffect, useMemo } from 'react'
import { useLocationSelectedStore } from '@/store/locationSelectedStore'
import { useGetProductLocationStock } from '../../hook/useProductLocationStock.hook'
import ProductHero from './ProductHero'
import ProductGallery from './ProductGallery'
import ProductReviews from './ProductReviews'
import ProductRelated from './ProductRelated'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: product, isLoading, isSuccess } = useGetProductById(Number(id))

  const locationSelected = useLocationSelectedStore(state => state.selected)
  const setOpenLocationModal = useLocationSelectedStore(
    state => state.setOpenModal
  )

  useEffect(() => {
    if (!locationSelected) {
      setOpenLocationModal(true)
    }
  }, [locationSelected, setOpenLocationModal])

  const productId = useMemo(() => {
    if (isSuccess && product) {
      return product.id
    }
    return undefined
  }, [isSuccess, product])

  const locationId = useMemo(() => {
    if (locationSelected) {
      return locationSelected.id
    }
    return undefined
  }, [locationSelected])

  const { data: stock } = useGetProductLocationStock({ productId, locationId })

  return (
    <>
      {product && stock && (
        <ProductHero product={product} productLocationStock={stock} />
      )}
      <div className='container my-12 grid grid-cols-[1fr,25rem] gap-x-6'>
        <div className='space-y-12'>
          <ProductGallery
            productGalleryList={product?.productGalleryList}
            isLoading={isLoading}
          />
          <ProductReviews
            isLoading={isLoading}
            reviewList={product?.reviewList}
          />
        </div>
        <ProductRelated productId={product?.id || 0} />
      </div>
    </>
  )
}

export default ProductPage

// TODO: IMPLEMENTAR LA VISTA DE PRODUCTO
// - [X] Implementar los comentarios
// - [-] Implementar el ranking de producto [ ] / reseñas / compras
// - [X] Implementar los productos relacionados
// - [ ] Implementar el contador de productos y el boton de agregar al carrito
// TODO: CAMBIAR EL LOCATION DESDE EL NAVBAR [X]
// TODO: IMPLEMENTAR EL BUSCARDOR
// TODO: IMPLEMENTAR EL RANKING DE PRODUCTO Y EL RANKING DE TIENDAS Y COMENTARIOS DEL PRODUCTO
// TODO: Tambien validar las dirección del cliente seleccionado ( district )
