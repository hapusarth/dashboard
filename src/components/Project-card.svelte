<script>
	import { createEventDispatcher } from 'svelte'

	export let card = {}
	export let isActive = false

	const dispatch = createEventDispatcher()

	const setSelectedCard = () => {
		dispatch('select', card)
	}
</script>

<button
	type="button"
	class="project-card"
	on:click={setSelectedCard}
	class:active={isActive}
>
	<div class="project-card__body">
		<h5 class="project-card__title">{card.template_name}</h5>
		<p class="project-card__text">
			{card.descr}
		</p>
	</div>
	{#if card.img}
		<div class="project-card__img">
			<img src={card.img} alt={card.template_name} />
		</div>
	{/if}
</button>

<style lang="scss">
	button {
		padding: 0;
		border: none;
		font: inherit;
		color: inherit;
		background-color: transparent;
		text-align: inherit;
	}
	.project-card {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		border: 1px solid rgba(65, 44, 173, 0.4);
		border-radius: 10px;
		box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.05);
		background: #fff;

		cursor: pointer;
		transition: all 0.1s ease;

		&__body {
			padding: 20px 0 30px 15px;
			flex: 1 1 80%;
		}
		&__title {
			margin-bottom: 30px;
			font-size: 20px;
			font-weight: 700;
		}
		&__text {
			font-size: 15px;
			letter-spacing: 1%;
			font-weight: 300;
		}
		&__img {
			margin-right: 20px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				max-width: 100%;
				max-height: 100%;
				object-fit: cover;
				align-self: center;
			}
		}

		&:hover {
			background: rgb(245, 245, 255);
		}

		&.active {
			color: #fff;
			background: rgb(82, 80, 213);
		}
	}
</style>
