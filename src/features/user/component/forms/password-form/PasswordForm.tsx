// TODO: CHANGE FILE STRUCTURE, THIS NOT'S A COMPONENT
import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/form/Input'
import { useUpdatePassword } from '@/features/user/hook/customers.hook'
import { useLoginStore } from '@/store/loginStore'
import {
  passwordSchema,
  TPasswordSchema
} from '../../../schema/password.schema'

const PasswordForm = () => {
  const [editPassword, setEditPassword] = useState(true)

  function onEnableEditPassword() {
    setEditPassword(!editPassword)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TPasswordSchema>({
    resolver: zodResolver(passwordSchema)
  })

  const id = useLoginStore(state => state.user!.id)

  const { mutate, isSuccess } = useUpdatePassword(id)

  const onSubmit = (data: TPasswordSchema) => {
    mutate({
      oldPassword: data.password,
      newPassword: data.newPassword
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setEditPassword(true)
      reset()
    }
  }, [isSuccess, reset, setEditPassword])

  return (
    <div className='relative mx-3 mb-8 w-[26rem] rounded-lg bg-stone-100 px-8 py-9 shadow-lg md:max-w-screen-sm'>
      <div className='absolute right-2 top-1'>
        <Button
          className='bg-transparent px-3 py-2 hover:bg-stone-200'
          onClick={onEnableEditPassword}
        >
          <Pencil color='black' strokeWidth={1.5} width={18} />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-2 gap-x-2 gap-y-4'
      >
        <Input
          classNameContainer='col-span-2'
          label='Contraseña Actual'
          type='password'
          className='w-full'
          hookForm={register('password')}
          disabled={editPassword}
          error={errors.password}
        />

        <Input
          classNameContainer='col-span-2'
          type='password'
          label='Nueva Contraseña'
          className='w-full'
          hookForm={register('newPassword')}
          disabled={editPassword}
          error={errors.newPassword}
        />

        <Input
          label='Confirmar Nueva Contraseña'
          classNameContainer='col-span-2'
          type='password'
          className='w-full'
          hookForm={register('confirmPassword')}
          disabled={editPassword}
          error={errors.confirmPassword}
        />
        <Button
          type='submit'
          disabled={editPassword}
          className={`col-span-2 w-full bg-green-600 transition-opacity hover:bg-green-700 ${editPassword && 'hidden'}`}
        >
          Guardar
        </Button>
      </form>
    </div>
  )
}

export default PasswordForm
