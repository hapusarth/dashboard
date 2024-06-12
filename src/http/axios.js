import axios from 'axios'
import { getTokenFromLocalStorage } from '../utils/token.helper'

const instance = axios.create({
	baseURL: 'https://new.dcpay.ru:8443/api/v1.0/'
})

instance.interceptors.request.use(config => {
	const token = getTokenFromLocalStorage()
	if (!token) {
		return config
	}

	config.headers.Authorization = 'Bearer ' + token

	return config
})

export { instance as axios }

