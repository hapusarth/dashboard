import { axios } from '../http/axios'

export class Factory {
	static async getEmpty() {
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		const requestBody = new URLSearchParams({
			action: 'create_factory'
		})

		const { data } = await axios.post('/factory-edit.php', requestBody, config)

		if (!+data.response) throw new Error(data.data.text)

		return data.data
	}

	static async createNew(name) {
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		const requestBody = new URLSearchParams({
			action: 'create_factory',
			data: JSON.stringify({
				name
			})
		})

		const { data } = await axios.post('/factory-edit.php', requestBody, config)

		if (!+data.response) throw new Error(data.data.text)
		
		return data.data
	}

	static async update(newData) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}

		newData.set('action', 'update_factory')

		const { data } = await axios.post('/factory-edit.php', newData, config)

		if (!+data.response) throw new Error(data.data.text)

		return data.data
	}

	static async getTemplates(params) {
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		const requestBody = new URLSearchParams({
			action: params?.action ?? null,
			data: JSON.stringify(params?.data) ?? null
		})

		const { data } = await axios.post('/factory-templ.php', requestBody, config)

		if (!+data.response) throw new Error(data.data.text)

		return data.data
	}
}
