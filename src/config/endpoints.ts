import axios from 'axios'
import { TIMEOUT_ENDPOINT_CANCEL } from './constants'

export const BASE_ENDPOINT =
  import.meta.env.VITE_BASE_ENDPOINT ?? 'http://localhost:8080'

export const SECURE_ENDPOINT = `${BASE_ENDPOINT}/secure/api`

export const PUBLIC_ENDPOINT = `${BASE_ENDPOINT}/public/api`

export const SECURE_ENDPOINT_V1 = `${SECURE_ENDPOINT}/v1`

export const PUBLIC_ENDPOINT_V1 = `${PUBLIC_ENDPOINT}/v1`

export const apiClient = axios.create({
  baseURL: BASE_ENDPOINT,
  timeout: TIMEOUT_ENDPOINT_CANCEL,
  withCredentials: true
})

export const PUBLIC_AUTH_ENDPOINT = `${PUBLIC_ENDPOINT_V1}/auth`
export const SECURE_AUTH_ENDPOINT = `${SECURE_ENDPOINT_V1}/auth`

export const LOGIN_ENDPOINT = `${PUBLIC_AUTH_ENDPOINT}/login`
export const VERIFY_TOKEN_ENDPOINT = `${SECURE_AUTH_ENDPOINT}/verify-token`
export const REGISTER_ENDPOINT = `${PUBLIC_AUTH_ENDPOINT}/register`

export const CLEAN_DATABASE_ENDPOINT = `${PUBLIC_AUTH_ENDPOINT}/actions/clean-database`
export const CATEGORY_ENDPOINT = `${PUBLIC_ENDPOINT_V1}/category`
export const PRODUCT_ENDPOINT = `${PUBLIC_ENDPOINT_V1}/product`
export const LOCATION_ENDPOINT = `${PUBLIC_ENDPOINT_V1}/location`
export const PRODUCT_LOCATION_STOCK_ENDPOINT = `${PUBLIC_ENDPOINT_V1}/product-location-stock`

export const USER_ENDPOINT = `${SECURE_ENDPOINT_V1}/user`
export const PROFILE_ENDPOINT = `${USER_ENDPOINT}/profile`
