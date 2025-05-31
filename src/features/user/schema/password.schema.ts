import z from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string({
        required_error: 'La contraseña es requerida'
      })
      .min(8, 'La contraseña debe de tener al menos 8 caracteres'),
    newPassword: z
      .string({ required_error: 'La nueva contraseña es requerida' })
      .min(8, 'La contraseña debe de tener al menos 8 caracteres'),
    confirmPassword: z
      .string({
        required_error: 'La confirmación de la contraseña es requerida'
      })
      .min(8, 'La contraseña debe de tener al menos 8 caracteres')
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
  })
  .superRefine(({ password, newPassword }, ctx) => {
    if (password === newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'La nueva contraseña no puede ser igual a la anterior',
        path: ['newPassword']
      })
    }
  })

export type TPasswordSchema = z.infer<typeof passwordSchema>
