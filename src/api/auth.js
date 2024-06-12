import { axios } from '../http/axios'
import {
	getTokenFromHash,
	removeTokenFromHash,
	setTokenToLocalStorage
} from '../utils/token.helper'

export class AuthService {
	static async login() {
		const token = getTokenFromHash()
		removeTokenFromHash()
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		const requestBody = new URLSearchParams({
			action: 'entry',
			data: JSON.stringify({
				secret_token: token
			})
		})

		const { data } = await axios.post('/register.php', requestBody, config)

		if (!+data.response) throw new Error(data.data.text)

		setTokenToLocalStorage(data.data.employer.access_token)

		return data.data
	}

	static async auth() {
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		const requestBody = new URLSearchParams({
			action: 'back'
		})

		const { data } = await axios.post('/register.php', requestBody, config)

		if (!+data.response) throw new Error(data.data.text)

		setTokenToLocalStorage(data.data.employer.access_token)

		return data.data
	}
}
