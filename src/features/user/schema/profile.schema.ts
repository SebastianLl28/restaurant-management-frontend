import z from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'Completa tu nombre'),
  lastName: z.string().min(1, 'Completa tu apellido'),
  username: z.string().email('Formato incorrecto del correo'),
  // dob: z.string().date('Ingrese una fecha valida')
  dob: z.date()
})

export type TProfileSchema = z.infer<typeof profileSchema>
