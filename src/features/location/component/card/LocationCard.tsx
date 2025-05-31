import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Location } from '@/model/Location.model'
import { Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LocationCard = ({ name, address, phone, id }: Location) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/locations/${id}`)
  }
  return (
    <Card className='relative overflow-hidden bg-gray-50' onClick={handleClick}>
      <CardHeader className='p-8'>
        <CardTitle className='line-clamp-1' title={name}>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-2 px-8'>
        <div className='flex flex-col gap-y-3'>
          <div>
            <p
              title={address}
              className='row-span-2 cursor-pointer self-center overflow-hidden overflow-ellipsis whitespace-nowrap  px-2 underline'
            >
              {address}
            </p>
          </div>
          <div className='flex items-center gap-x-3'>
            <Phone color='#d90a3e' />
            <div>
              <h2>Teléfono</h2>
              <p className='underline'>{phone}</p>
            </div>
          </div>
        </div>
        <div>
          <Badge variant='outline' className='text-sm'>
            Delivery
          </Badge>
          <Badge variant='outline' className='text-sm'>
            Recojo en tienda
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default LocationCard
