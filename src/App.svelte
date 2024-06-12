<script>
	import { Route, Router } from 'svelte-routing'
	import Layout from './components/Layout.svelte'
	import { routes } from './routes'

	export let url = ''
</script>

<Router {url}>
	<Layout>
		{#each routes as route}
			<Route {...route} />
		{/each}
	</Layout>
</Router>

<style>
</style>
