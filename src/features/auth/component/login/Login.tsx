import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useLoginModalStore } from '@/store/loginModalStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TLoginSchema, loginSchema } from '../../schema/login.schema'
import Input from '@/components/form/Input'
// import { useNavigate } from 'react-router-dom'
import { useAuthLogin } from '@/features/auth/hooks/auth.hook'

const Login = () => {
  const { isOpen, close } = useLoginModalStore()
  // const navigate = useNavigate()

  const { mutate } = useAuthLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data: TLoginSchema) => {
    mutate(data, {
      onSuccess: () => {
        close()
        reset()
      }
    })
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        data-testid='login-modal'
        className='w-11/12 rounded-md'
      >
        <form
          className='space-y-4'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Iniciar Sesión
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className='space-y-3'>
            <Input
              type='email'
              placeholder='example@gmail.com'
              label='Correo Electrónico'
              hookForm={register('username')}
              aria-required='true'
              aria-invalid={errors.username ? 'true' : 'false'}
              error={errors.username}
            />
            <Input
              type='password'
              placeholder='your password'
              label='Contraseña'
              hookForm={register('password')}
              aria-required='true'
              aria-invalid={errors.password ? 'true' : 'false'}
              error={errors.password}
            />
          </div>
          <AlertDialogFooter>
            <Button variant='ghost' type='button' role='button' onClick={close}>
              Cerrar
            </Button>
            <AlertDialogAction type='submit'>Ingresar</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Login
