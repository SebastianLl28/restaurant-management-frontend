import LocationCard from '../../component/card/LocationCard'
import { useGetLocations } from '../../hook/location.hook'

const LocationsPage = () => {
  const { data, isLoading, isError, isSuccess } = useGetLocations()
  return (
    <main className='container my-12 space-y-12'>
      <div className='flex  flex-col items-center justify-center gap-6'>
        <h1 className='text-2xl font-bold'>Nuestros locales</h1>
        <span className='text-lg'>Ubica tu restaurante más cercano</span>
      </div>

      <div className='flex flex-wrap justify-center space-y-10'>
        <ul className='grid w-3/4 grid-cols-2 gap-20'>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error</p>}
          {!isLoading &&
            isSuccess &&
            data.length > 0 &&
            data.map(location => (
              <div key={location.id} className='w-200 h-48'>
                <LocationCard {...location} />
              </div>
            ))}
        </ul>
      </div>
    </main>
  )
}

export default LocationsPage
