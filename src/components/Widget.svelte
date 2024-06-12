<script>
	export let title = ''

	let isHidden = false
</script>

<div class="widget-tp" class:hide={isHidden}>
	<div class="widget-tp__header">
		<h3 class="widget-tp__title">{title}</h3>
		<button
			class="widget-tp__hide-trigger"
			on:click={() => {
				isHidden = !isHidden
			}}
		></button>
	</div>

	<div class="widget-tp__body">
		<slot />
	</div>

	<div class="widget-tp__more">
		<button type="button">Показать подробнее</button>
	</div>
</div>

<style scoped>
	button {
		cursor: pointer;
	}
	.widget-tp {
		position: relative;
		max-width: 500px;
		height: 300px;
		border-radius: 10px;
		background: #ffffff;
		padding: 20px;
		overflow: hidden;
		box-shadow: 5px 0 15px 0 rgba(0, 0, 0, 0.05);
		transition: height 0.1s linear;
	}
	.widget-tp.hide {
		height: 25px;
	}
	.widget-tp.hide .widget-tp__title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-height: 25px;
	}
	.widget-tp__header {
		position: relative;
		margin-bottom: 20px;
		gap: 10px;
	}
	.widget-tp__title {
		font-size: 20px;
		font-weight: 700;
		word-wrap: break-word;
		max-width: 80%;
	}
	.widget-tp__hide-trigger {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 3;
		width: 24px;
		height: 24px;
		background: transparent;
		background: url('/icons/eye.svg') no-repeat;
		cursor: pointer;
	}

	.widget-tp.hide .widget-tp__hide-trigger {
		background: url('/icons/eye-closed.svg') no-repeat;
	}

	.widget-tp.hide .widget-tp__body {
		height: 0;
		display: none;
	}

	.widget-tp__more {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 15px 0;
		text-align: center;
		background: #fff;
		color: #7658e0;
		font-weight: 500;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.widget-tp.hide .widget-tp__more {
		display: none;
	}
</style>
