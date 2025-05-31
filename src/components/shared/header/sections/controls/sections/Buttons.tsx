import { Link } from 'react-router-dom'
import { useLocationModalStore } from '@/store/localModalStore'
import { useModalStore } from '@/store/modalStore'
import useCartStore from '@/store/cartStore'
import { useLoginModalStore } from '@/store/loginModalStore'
import { Button, buttonVariants } from '@/components/ui/button'
import { MapPin, Search, ShoppingCart, User } from 'lucide-react'
import { useSearchStore } from '@/store/searchStore'
import { useLoginStore } from '@/store/loginStore'
import { objectIsEmpty } from '@/lib/utils'

const Buttons = () => {
  const { open } = useLoginModalStore()
  const { setIsOpen } = useModalStore()

  const { items } = useCartStore()
  const { setIsOpen: setIsOpenLocalModalStore } = useLocationModalStore()

  const { setIsOpenSearch, isOpenSearch } = useSearchStore()

  const user = useLoginStore(state => state.user)

  return (
    <ul className='flex items-center gap-5 font-semibold'>
      <li>
        <Button
          className='size-12 rounded-full p-0 md:hidden'
          variant='ghost'
          type='button'
          name='location button'
          aria-label='location button'
          onClick={() => setIsOpenLocalModalStore(true)}
        >
          <MapPin size={30} />
        </Button>
      </li>
      <li>
        <Button
          className='size-12 rounded-full p-0'
          variant='ghost'
          type='button'
          name='search button'
          aria-label='search button'
          onClick={() => setIsOpenSearch(!isOpenSearch)}
        >
          <Search size={30} />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => setIsOpen(true)}
          className='relative size-12 rounded-full p-0'
          variant='ghost'
        >
          <ShoppingCart size={30} />
          <span className='absolute -top-0.5 right-0 h-5 w-5 rounded-full bg-red-500 text-white'>
            {items.length}
          </span>
        </Button>
      </li>
      {!objectIsEmpty(user) ? (
        <li className={`${buttonVariants({ variant: 'ghost' })} px-0`}>
          <Link to='/profile' className='flex items-center gap-2 px-2'>
            <span>{user?.name}</span>
            <User size={33} />
          </Link>
        </li>
      ) : (
        <li>
          <Button
            className='size-12 rounded-full p-0'
            variant='ghost'
            type='button'
            name='login button'
            aria-label='login button'
            onClick={open}
          >
            <User size={33} />
          </Button>
        </li>
      )}
    </ul>
  )
}

export default Buttons
