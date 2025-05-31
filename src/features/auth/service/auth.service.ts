import { baseApi } from '@/api/baseApi'
import { LOGIN_ENDPOINT, VERIFY_TOKEN_ENDPOINT } from '@/config/endpoints'

interface ILogin {
  username: string
  password: string
}
export const postLogin = async ({ username, password }: ILogin) => {
  return await baseApi
    .post(LOGIN_ENDPOINT, { username, password })
    .then(res => res.data)
}

export const getVerifyToken = async () => {
  return await baseApi.get(VERIFY_TOKEN_ENDPOINT).then(res => res.data)
}
