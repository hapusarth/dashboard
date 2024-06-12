import { writable } from 'svelte/store'

export const auth = writable({
	isLoading: false,
	filled: false,
	employer: {},
	alert: [],
	group: {},
	news: [],
	view: {}
})