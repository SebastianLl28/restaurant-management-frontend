// import { customerAdapter } from '@/adapters/customer.adapter'
import {
  getProfile,
  updateProfile,
  updatePassword,
  IProfile
} from '@/features/user/service/customers.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useGetProfileById = () => {
  return useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    retry: 1
    // select: profile => customerAdapter(profile)
  })
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ['putProfile'],
    mutationFn: (body: IProfile) => updateProfile(body),
    onSuccess: () => {
      toast.success('Perfil actualizado')
    },
    onError: () => {
      toast.error('Error al actualizar el perfil')
    }
  })
}

interface IUpdatePassword {
  oldPassword: string
  newPassword: string
}

export const useUpdatePassword = (id: number) => {
  return useMutation({
    mutationKey: ['putPassword'],
    mutationFn: (data: IUpdatePassword) =>
      updatePassword(id, data.oldPassword, data.newPassword),
    onSuccess: () => {
      toast.success('Contraseña actualizada')
    },
    onError: (response: AxiosError<string>) => {
      toast.error(response.response?.data)
    }
  })
}
