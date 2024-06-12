<script>
	export let title = ''
	export let img = ''
</script>

<div class="blog">
	<img src={img} alt={title} />
	<div class="blog__info">
		<h5 class="blog__title">{title}</h5>
		<p class="blog__description">Блог</p>
	</div>
</div>

<style lang="scss">
	.blog {
		display: flex;
		align-items: center;
		gap: 15px;

		img {
			border-radius: 12px;
		}

		&__info {
			font-size: 18px;
		}
		&__description {
			color: #747474;
		}
	}
</style>
