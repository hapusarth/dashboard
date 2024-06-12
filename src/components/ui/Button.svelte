<script>
	export let type = 'default'
	export let classes = ''
	export let disabled = false
	export let onClick = () => undefined

	classes = classes.concat(' ', 'button ', type === 'default' ? '' : 'button--outline')
</script>

<button class={classes} {disabled} on:click={onClick}>
	<slot />
</button>

<style lang="scss">
	.button {
		width: 100%;
		gap: 10px;
		padding: 14px 60px;
		font-size: 18px;
		border-radius: 10px;
		color: #fff;
		background: #412cad;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: #2f1f7c;
		}
		
		&:disabled {
			background: #585965;
			color: #fff;
			cursor: default;
		}
	}

	.button--outline {
		color: #412cad;
		background: transparent;

		&,
		&:active,
		&:focus {
			border: 1px solid #412cad;
		}

		&:hover {
			color: #fff;
			background: #412cad;
		}

		&:disabled {
			background: transparent;
			color: #585965;
			border: 2px solid #585965;
		}
	}
</style>
