<script>
// @ts-nocheck

	import Cropper from 'cropperjs'
	import 'cropperjs/dist/cropper.min.css'
	import { createEventDispatcher } from 'svelte'
	import Button from '../ui/Button.svelte'
	import '/src/styles/widgets.scss'

	export let data = {}

	let fileInput
	let thumbnail
	let canvas
	let context
	let cropper
	let text = data?.text?.param?.data ?? ''
	let isEditing = false
	let isModalActive = false
	let isWidgetDisabled = !+data?.isDisplayed
	let isButtonDisabled = isWidgetDisabled ? true : !+data?.button?.isDisplayed
	let isEditDisabled = isWidgetDisabled || !+data?.isEditable

	const dispatcher = createEventDispatcher()

	$: {
		if (!isEditing) {
			data.text.param.data = text
			dispatcher('change', data)
		}
	}

	const handleFileUpload = e => {
		const file = e.target.files[0]
		context = canvas.getContext('2d')
		if (file.type.match(/^image\//)) {
			const reader = new FileReader()
			reader.onload = evt => {
				const img = new Image()
				img.onload = () => {
					context.canvas.height = img.height
					context.canvas.width = img.width
					context.drawImage(img, 0, 0)
					if (cropper) {
						cropper.destroy()
					}
					cropper = new Cropper(canvas, {
						aspectRatio: 1
					})
					isModalActive = true
				}
				img.src = evt.target.result
			}
			reader.readAsDataURL(file)

			return
		}

		const newData = {
			name: data.nameId,
			fileMeta: {
				fileName: file.name,
				sizeFile: file.size,
				extFile: file.type.split('/')[1]
			},
			file
		}

		dispatcher('loadFile', newData)
	}

	const handleCropImage = () => {
		isModalActive = false
		thumbnail = cropper.getCroppedCanvas().toDataURL('image/png')
		const newData = {
			name: data.nameId,
			fileMeta: {
				fileName: fileInput.files[0].name,
				sizeFile: fileInput.files[0].size,
				extFile: fileInput.files[0].type.split('/')[1]
			},
			file: fileInput.files[0],
			thumbnail
		}

		fileInput.value = null
		dispatcher('loadFile', newData)
	}

	const handleCancelCrop = () => {
		isModalActive = false
		fileInput.value = null
	}
</script>

<div
	class="widget"
	class:editable={+data?.isEditable}
	class:disabled={isWidgetDisabled}
	class:isEditing
>
	<div class="widget__wrapper">
		<div class="widget__header">
			<h5 class="widget__title">{data?.title}</h5>
			<button
				type="button"
				class="widget__edit"
				class:disabled={isEditDisabled}
				on:click={() => {
					if (isWidgetDisabled || !+data?.isEditable) return
					isEditing = !isEditing
				}}
			>
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
		</div>

		{#if isEditing}
			<div class="widget__body">
				<input
					class="widget__input"
					type="text"
					bind:value={text}
					on:blur={() => (isEditing = false)}
					on:keypress={e => {
						e.key === 'Enter' ? (isEditing = false) : null
					}}
				/>
				{#if +data?.icon?.isDisplayed}
					<div class="widget__icon">
						{#if thumbnail ? false : data?.icon?.param?.data?.includes('<?xml')}
							{@html data?.icon?.param?.data}
						{:else}
							<img src={thumbnail || data?.icon?.param?.data} alt={'Иконка'} />
						{/if}
					</div>
				{/if}
			</div>
		{:else}
			<div class="widget__body">
				<p>
					{#if +data?.text?.isDisplayed}
						{text}
					{/if}
				</p>
				{#if +data?.icon?.isDisplayed}
					<div class="widget__icon">
						{#if thumbnail ? false : data?.icon?.param?.data?.includes('<?xml')}
							{@html data?.icon?.param?.data}
						{:else}
							<img src={thumbnail || data?.icon?.param?.data} alt={'Иконка'} />
						{/if}
					</div>
				{/if}
			</div>
		{/if}

		{#if +data?.button?.isDisplayed}
			<div class="widget__button" class:disabled={isButtonDisabled}>
				<input type="file" class="hidden" bind:this={fileInput} on:input={handleFileUpload} />
				<button type="button" disabled={isButtonDisabled} on:click={() => fileInput.click()}
					>{data?.button_name ?? 'Действие'}</button
				>
			</div>
		{/if}
	</div>
</div>

<div class="modal" class:hidden={!isModalActive}>
	<div class="cropper-img">
		<canvas id="canvas" bind:this={canvas}></canvas>
		<div class="actions">
			<Button onClick={handleCropImage}>Подтвердить</Button>
			<Button type="outlined" onClick={handleCancelCrop}>Отмена</Button>
		</div>
	</div>
</div>

<style>
	img {
		display: block;
		max-width: 100%;
	}

	.actions {
		margin-top: 20px;
		display: flex;
		gap: 15px;
	}

	.cropper-img {
		width: 500px;
		height: 500px;
	}

	#canvas {
		height: 300px;
		width: 300px;
		background-color: #ffffff;
		cursor: default;
		border: 1px solid black;
	}
</style>
