<script>
	import { onMount } from 'svelte'
	import { AuthService } from '../api/auth'
	import { auth } from '../store/auth'
	import { getTokenFromHash, removeTokenFromLocalStorage } from '../utils/token.helper'
	import Aside from './Aside.svelte'
	import Header from './Header.svelte'

	const authHandler = async () => {
		try {
			auth.update(prev => ({ ...prev, isLoading: true, filled: false }))
			if (getTokenFromHash()) {
				removeTokenFromLocalStorage()
				const data = await AuthService.login()
				auth.set(data)
			} else {
				const data = await AuthService.auth()
				auth.set(data)
			}
			auth.update(prev => ({ ...prev, isLoading: false, filled: true }))
		} catch (err) {
			alert(err.message)
			window.location.href = 'https://paymall.pw/'
		} finally {
			auth.update(prev => ({ ...prev, isLoading: false }))
		}
	}

	onMount(authHandler)
</script>

<Header {authHandler} />
<Aside />
<div class="wrapper">
	<slot />
</div>
