import Skeleton from '@/components/shared/skeleton/Skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { ProductGallery as ProductGalleryModel } from '@/model/Product.model'

interface Props {
  productGalleryList: ProductGalleryModel[] | undefined
  isLoading: boolean
}

const ProductGallery = ({ productGalleryList, isLoading }: Props) => {
  return (
    <Skeleton isLoading={isLoading} className='h-[20rem] w-full'>
      <div className='flex gap-4'>
        <Carousel
          opts={{
            loop: true,
            align: 'start'
          }}
          className='w-full overflow-hidden'
        >
          <CarouselContent>
            {productGalleryList?.map((item, index) => (
              <CarouselItem className='basis-1/3' key={index}>
                <img
                  src={item.imageUrl}
                  className='h-[20rem] w-full rounded object-cover'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {productGalleryList?.map((item, index) => (
          <div key={index} className='flex-1'>
            <img
              src={item.imageUrl}
              className='h-[20rem] w-full object-cover'
            />
          </div>
        ))}
      </div>
    </Skeleton>
  )
}

export default ProductGallery
