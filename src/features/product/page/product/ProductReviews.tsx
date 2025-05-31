import Skeleton from '@/components/shared/skeleton/Skeleton'
import { Review } from '@/model/Product.model'

interface Props {
  reviewList: Review[] | undefined
  isLoading: boolean
}

const ProductReviews = ({ reviewList, isLoading }: Props) => {
  return (
    <div className='flex flex-col space-y-1 pb-6 text-gray-500'>
      <h2 className='text-2xl font-bold'>Reseñas</h2>
      <ul className='!mt-4 space-y-6'>
        <Skeleton isLoading={isLoading} className='h-20 w-full'>
          {reviewList && reviewList.length > 0 ? (
            reviewList.map((valoration, index) => (
              <li key={index} className='grid'>
                <div className='flex items-center gap-2'>
                  <img src='/user.svg' alt='' className='row-span-2 w-8' />
                  <span className='font-semibold'>{valoration.fullName}</span>
                </div>
                <p className='mt-1 italic'>
                  {valoration.comment
                    ? `"${valoration.comment}"`
                    : 'Sin reseña'}
                </p>
                <div className='flex gap-1'>
                  <span>{valoration.score}</span>
                  <img src='/star.svg' alt='star icon' />
                </div>
              </li>
            ))
          ) : (
            <div className='text-center'>
              <p className='text-2xl font-bold'>Sin reseñas</p>
            </div>
          )}
        </Skeleton>
      </ul>
    </div>
  )
}

export default ProductReviews
