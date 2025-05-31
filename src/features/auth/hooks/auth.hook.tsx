import { PROFILE_PATH } from '@/config/path'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { getVerifyToken, postLogin } from '../service/auth.service'
import { useLoginStore } from '@/store/loginStore'
import { useEffect } from 'react'

export const useAuthLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: postLogin,
    onSuccess: res => {
      toast.success('Inicio de sesión exitoso')
      localStorage.setItem('token', res.jwt)
      navigate(PROFILE_PATH)
    },
    onError: () => {
      toast.error('Contraseña o correo incorrecto')
    }
  })
}

export const useVerifyToken = () => {
  const setUser = useLoginStore(state => state.setUser)
  const clearUser = useLoginStore(state => state.clearUser)
  const navigate = useNavigate()

  const { data, isError } = useQuery({
    queryKey: ['auth', 'verify'],
    queryFn: getVerifyToken,
    refetchOnWindowFocus: false,
    retry: false
  })

  useEffect(() => {
    if (data) {
      setUser({
        id: data.id,
        username: data.username
      })
    }
  }, [data, setUser])

  useEffect(() => {
    if (isError) {
      navigate('/')
      localStorage.removeItem('token')
      clearUser()
    }
  }, [isError, clearUser, navigate])
}
