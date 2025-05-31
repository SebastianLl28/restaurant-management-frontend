import Skeleton from '@/components/shared/skeleton/Skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Product } from '@/model/Product.model'
// import { Califications } from '@/page/product-detail/sections/hero/shared'
import ProductCounter from './ProductCounter'
import { ProductLocationStock } from '@/model/ProductLocationStock.model'
import useCartStore from '@/store/cartStore'

interface Props {
  product: Product
  productLocationStock: ProductLocationStock
}

const ProductHero = ({ product, productLocationStock }: Props) => {
  const addItem = useCartStore(state => state.addItem)
  const isLoading = false // TODO: change

  const handleFoodAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      imageUrl: product.cardImage,
      price: product.price,
      description: product.description,
      stock: [
        {
          store: 'test',
          quantity: productLocationStock.quantity
        }
      ]
    }
    addItem(item, 1)
  }

  return (
    <section className='h-fit bg-gray-900 py-16 text-white'>
      <div className='container grid grid-cols-2'>
        <div className='space-y-8'>
          <div>
            <div className='mb-4'>
              <Skeleton isLoading={isLoading} className='h-16 w-[32rem]'>
                <h1 className='text-6xl font-bold'>{product?.name}</h1>
              </Skeleton>
            </div>

            <Skeleton isLoading={isLoading} className='h-6 w-32'>
              <div className='flex gap-2.5'>
                {product?.productCategoryList.map(item => (
                  <Badge key={item.id} className='text-sm '>
                    {item.category.name}
                  </Badge>
                ))}
              </div>
            </Skeleton>
          </div>
          {/* <Califications
            valoration={product?.valoration || 0}
            isLoading={isLoading}
          /> */}
          <div className='h-[4em]'>
            <Skeleton isLoading={isLoading} className='h-[4em] w-[36rem]'>
              <p className='text-xl'>{product?.description}</p>
            </Skeleton>
          </div>
          <div className='space-y-4'>
            <ProductCounter productLocationStock={productLocationStock} />
            <div className='flex items-center gap-3'>
              <Button
                onClick={handleFoodAdd}
                className='bg-green-700 hover:bg-green-800'
                // disabled={isDisabledAddToCart}
              >
                Agregar Al Carrito
              </Button>
            </div>
          </div>
        </div>
        <div className='relative flex justify-end'>
          <Skeleton isLoading={isLoading} className='h-full w-full'>
            <img
              src={product?.cardImage}
              alt={product?.name}
              className='w-full rounded bg-cover bg-center'
            />
          </Skeleton>
        </div>
      </div>
    </section>
  )
}

export default ProductHero
