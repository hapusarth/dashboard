<script>
	export let isEditable = true
	export let title = ''
</script>

<div class="project-item" class:editable={isEditable}>
	<h5 class="project-item__title">{title}</h5>

	<div class="project-item__body">
		<slot />
	</div>

	{#if isEditable}
		<button type="button" class="project-item__edit">
			<svg
				width="21.000000"
				height="21.000000"
				viewBox="0 0 21 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<defs />
				<path
					id="Vector"
					d="M13.33 1.3C15.07 -0.44 17.9 -0.44 19.65 1.3C21.39 3.05 21.39 5.88 19.65 7.63L7.78 19.49L20.24 19.49C20.66 19.49 21 19.83 21 20.24C21 20.66 20.66 21 20.24 21L0.71 21C0.29 21 -0.04 20.66 -0.04 20.24L-0.04 14.98C-0.04 14.79 0.04 14.59 0.18 14.45L13.33 1.3ZM5.66 19.49L15.8 9.35L11.6 5.15L1.46 15.3L1.46 19.49L5.66 19.49ZM12.67 4.09L16.86 8.29L18.59 6.56C19.74 5.4 19.74 3.53 18.59 2.37C17.43 1.21 15.55 1.21 14.39 2.37L12.67 4.09Z"
					fill="#000000"
					fill-opacity="1.000000"
					fill-rule="evenodd"
				/>
			</svg>
		</button>
	{/if}
</div>
