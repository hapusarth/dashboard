import { writable } from 'svelte/store'

export const breadcrumbs = writable({
	headTitle: true,
	prev: [],
	current: {
		href: '',
		title: ''
	}
})