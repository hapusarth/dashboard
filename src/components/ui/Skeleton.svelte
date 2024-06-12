<script>
	export let width = '100px'
	export let height = '100px'
</script>

<div style='width:{width}; height:{height}' class="skeleton"></div>

<style>
	.skeleton {
		border-radius: 5px;
		background: #ececec;
		animation: fade 2s infinite forwards;
	}
	@keyframes fade {
		0% {
			background: #ececec;
		}
		50% {
			background: #d4d4d4;
		}
		100% {
			background: #ececec;
		}
	}
</style>
