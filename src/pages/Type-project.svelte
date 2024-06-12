<script>
	import { onMount } from 'svelte'
	import { navigate, useLocation } from 'svelte-routing'
	import { Factory } from '../api/factory'
	import ProjectCard from '../components/Project-card.svelte'
	import Button from '../components/ui/Button.svelte'
	import Skeleton from '../components/ui/Skeleton.svelte'
	import { breadcrumbs } from '../store/breadcrumbs'

	let cards = []
	let isLoading = false
	let params = null

	$: selectedCard = cards[0]

	const location = useLocation()
	location.subscribe(route => (params = route.state))

	const selectCard = event => {
		selectedCard = event.detail
	}

	const fetchTemplates = async () => {
		if (!params) {
			return navigate('/')
		}

		try {
			isLoading = true
			const response = await Factory.getTemplates(params)
			cards = response.data
		} catch (e) {
			alert(e)
			navigate('/')
		} finally {
			isLoading = false
		}
	}

	onMount(() => {
		breadcrumbs.set({
			headTitle: true,
			prev: [
				{
					title: 'Главная',
					href: '/'
				}
			],
			current: {
				href: '/type-project',
				title: 'Тип проекта'
			}
		})

		fetchTemplates()
	})
</script>

<main class="main project-type">
	<div class="project-type__wrapper">
		<section class="project-types">
			<div class="project-types__col">
				{#if isLoading || !cards.length}
					{#each new Array(5) as _}
						<Skeleton height="200px" width="100%" />
					{/each}
				{:else}
					{#each cards as card}
						<ProjectCard
							on:select={selectCard}
							{card}
							isActive={selectedCard.template_id === card.template_id}
						/>
					{/each}
				{/if}
			</div>

			<div class="project-type-info">
				{#if isLoading || !cards.length}
					<Skeleton width="100%" height="200px" />
				{:else}
					<div class="project-type-info__body" id="project-type-info">
						<h5 class="project-type-info__title">{selectedCard?.template_name}</h5>
						<p class="project-type-info__text">
							{selectedCard?.descr}
						</p>
					</div>
				{/if}
				<Button disabled={isLoading || !cards.length}>Подтвердить</Button>
			</div>
		</section>
	</div>
</main>

<style lang="scss">
	.main__title {
		font-size: 24px;
		font-weight: 700;
		color: #132143;
		margin-bottom: 15px;
	}

	.project-type__wrapper {
		padding: 47px 100px 40px 47px;
	}

	.project-types {
		display: grid;
		grid-template-columns: 1.7fr 1fr;
		gap: 30px;

		&__col {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			gap: 15px;
		}
	}

	.project-type-info {
		max-width: 800px;

		&__body {
			margin-bottom: 20px;
			padding: 25px 25px 60px 20px;
			border-radius: 10px;
			box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.05);
			background: rgb(255, 255, 255);
		}
		&__title {
			font-size: 20px;
			font-weight: 700;
			margin-bottom: 30px;
		}
		&__text {
			font-size: 15px;
			font-weight: 300;
			line-height: 18px;
			letter-spacing: 1%;
		}
	}
</style>
