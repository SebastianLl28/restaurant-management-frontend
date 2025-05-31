import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const objectIsEmpty = (obj: object | null): boolean => {
  if (obj === null) return true
  if (typeof obj !== 'object') return true
  if (Array.isArray(obj)) return obj.length === 0
  return Object.keys(obj).length === 0
}
