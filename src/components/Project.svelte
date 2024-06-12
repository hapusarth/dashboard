<script>
	export let title = ''
	export let statusInHead = false
</script>

<div class="project">
	<div class="project__header" class:project__header--status={statusInHead}>
		<h4 class="project__title">{title}</h4>
		{#if statusInHead}
			<img class="project__status" src="/project-status.png" alt="Статус проекта" />
		{/if}
	</div>
	<div class="project__content">
		<slot />
	</div>
</div>

<style lang="scss">
	.project {
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.7);

		&__header {
			padding: 60px 20px;

			&--status {
				padding: 10px 15px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 10px;
			}
		}
		&__title {
			font-size: 22px;
			font-weight: 700;
			line-height: 22px;
		}
		&__status {
			max-width: 120px;
		}
		&__content {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			row-gap: 15px;
			column-gap: 20px;
		}
	}
</style>
