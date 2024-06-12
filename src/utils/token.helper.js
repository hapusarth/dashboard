export const getTokenFromLocalStorage = () => {
	return localStorage.getItem('access_token') ?? ''
}

export const setTokenToLocalStorage = token => {
	localStorage.setItem('access_token', token)
}

export const removeTokenFromLocalStorage = () => {
	localStorage.removeItem('access_token')
}

export const getTokenFromHash = () => {
	return window.location.hash.slice(1)
}

export const removeTokenFromHash = () => {
	history.pushState('', document.title, window.location.pathname + window.location.search)
}
