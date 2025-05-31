// TODO: CHANGE FILE STRUCTURE, THIS NOT'S A COMPONENT
import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useUpdateProfile } from '@/features/user/hook/customers.hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { TProfileSchema, profileSchema } from '../../../schema/profile.schema'
import Input from '@/components/form/Input'
import { IProfile } from '../../../service/customers.service'

interface Props {
  profile: IProfile
}

const ProfileForm = ({ profile }: Props) => {
  const [editProfile, setEditProfile] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      lastName: profile.lastName,
      username: profile.username,
      dob: new Date(profile.dob).toISOString().split('T')[0]
    }
  })

  const onEnableEditAccount = () => {
    setEditProfile(!editProfile)
  }

  const { mutate } = useUpdateProfile()

  const onSubmit: SubmitHandler<TProfileSchema> = async data => {
    mutate(data)
    setEditProfile(!editProfile)
  }

  return (
    <div className='relative mx-3 mb-8 w-full rounded-lg bg-stone-100 px-8 py-9 shadow-lg md:max-w-screen-sm'>
      <div className='absolute right-2 top-1'>
        <Button
          className='bg-transparent px-3 py-2 hover:bg-stone-200'
          onClick={onEnableEditAccount}
        >
          <Pencil color='black' strokeWidth={1.5} width={18} />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-2 gap-x-2 gap-y-4'
      >
        <Input
          label='Nombre'
          className='w-full'
          hookForm={register('name')}
          classNameContainer='col-span-2 md:col-span-1'
          disabled={!editProfile}
          error={errors.name}
        />
        <Input
          label='Apellidos'
          className='w-full'
          hookForm={register('lastName')}
          classNameContainer='col-span-2 md:col-span-1'
          disabled={!editProfile}
          error={errors.lastName}
        />
        <Input
          label='Correo'
          className='w-full'
          hookForm={register('username')}
          classNameContainer='col-span-2'
          disabled={!editProfile}
          error={errors.username}
        />
        <Input
          type='date'
          label='Cumpleaños'
          className='w-full'
          hookForm={register('dob')}
          classNameContainer='col-span-2'
          disabled={!editProfile}
          error={errors.dob}
        />
        <div
          className={!editProfile ? 'col-span-2 hidden' : 'col-span-2 block'}
        >
          <Button
            type='submit'
            className='mt-5 w-full bg-green-600 hover:bg-green-700'
          >
            Editar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
