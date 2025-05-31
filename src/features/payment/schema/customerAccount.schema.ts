import z from 'zod'

export const customerAccountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  documentType: z
    .enum(['DNI', 'PASAPORTE', 'CE'], {
      errorMap: () => ({ message: 'Invalid document type' })
    })
    .optional(),
  documentNumber: z.string().min(1, 'Document number is required').optional(),
  businessName: z.string().optional(),
  businessTaxId: z.string().optional()
})

export type CustomerAccountSchema = z.infer<typeof customerAccountSchema>
