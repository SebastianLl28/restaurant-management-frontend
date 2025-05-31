import { baseApi } from '@/api/baseApi'
import { PROFILE_ENDPOINT } from '@/config/endpoints'

export interface IProfile {
  username: string
  name: string
  lastName: string
  dob: Date
}

export const getProfile = async () => {
  return await baseApi.get<IProfile>(PROFILE_ENDPOINT).then(res => res.data)
}

export const updateProfile = async (updateData: IProfile) => {
  return await baseApi.put(PROFILE_ENDPOINT, updateData).then(res => res.data)
}

export const updatePassword = async (
  id: number,
  oldPassword: string,
  newPassword: string
) => {
  return await baseApi
    .post(`/customers/change-password/${id}`, { oldPassword, newPassword })
    .then(res => res.data)
}
