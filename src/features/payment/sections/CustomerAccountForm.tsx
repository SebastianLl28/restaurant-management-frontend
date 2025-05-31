import Input from '@/components/form/Input'
import { Button } from '@/components/ui/button'
import { objectIsEmpty } from '@/lib/utils'
import { useLoginStore } from '@/store/loginStore'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CustomerAccountForm = () => {
  const [isInvoice, setIsInvoice] = useState(false)

  const user = useLoginStore(state => state.user)

  // TODO: Implement auto complete customer data
  const { register } = useForm()

  return (
    <div className='flex w-11/12 max-w-4xl flex-col space-y-8 rounded-lg bg-white px-12 py-8 shadow-md'>
      {objectIsEmpty(user) && (
        <div className='flex flex-col gap-5'>
          <h2 className='text-center text-xl font-bold'>
            Registrate, para obtener mayores beneficios
          </h2>
          <Button className='mx-auto'>Registrate</Button>
        </div>
      )}
      <form>
        <div className='grid grid-cols-2 gap-8'>
          <Input label='Nombre' />
          <Input label='Apellido' />
        </div>
      </form>
    </div>
  )
}

export default CustomerAccountForm
