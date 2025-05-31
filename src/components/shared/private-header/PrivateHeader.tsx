import { PRIVATE_ROUTER } from '@/config/path'
import { MouseEvent, useLayoutEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const header = [
  {
    name: 'Perfil',
    path: PRIVATE_ROUTER.PROFILE
  },
  {
    name: 'Favoritos',
    path: PRIVATE_ROUTER.FAVORITE
  },
  {
    name: 'Compras',
    path: PRIVATE_ROUTER.PURCHASE
  },
  {
    name: 'Direcciones',
    path: PRIVATE_ROUTER.ADDRESS
  }
]

const PrivateHeader = () => {
  const refLine = useRef<HTMLDivElement | null>(null)

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    const target = e.target as HTMLAnchorElement
    const rect = target.getBoundingClientRect()

    if (refLine.current) {
      refLine.current.style.width = `${rect.width}px`
      refLine.current.style.left = `${rect.left}px`
    }
  }

  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const target = document.querySelector(
      `a[href="${pathname}"][data-link="${pathname}"]`
    )
    if (target) {
      const rect = (target as HTMLAnchorElement).getBoundingClientRect()

      if (refLine.current) {
        refLine.current.style.width = `${rect.width}px`
        refLine.current.style.left = `${rect.left}px`
      }
    }
  }, [pathname])

  return (
    <header className='h-min'>
      <nav className='py-12'>
        <ul className='relative flex justify-center'>
          {header.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className='inline-block px-10 py-2 text-center font-semibold transition-colors'
                data-link={item.path}
                onClick={e => handleClick(e)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <div
            ref={refLine}
            className='absolute bottom-0 h-1 bg-primary transition-all duration-500'
          ></div>
        </ul>
      </nav>
    </header>
  )
}

export default PrivateHeader
