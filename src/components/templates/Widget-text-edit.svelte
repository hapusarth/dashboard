<script>
	import Cherry from 'cherry-markdown'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'
	import '/src/styles/widgets.scss'

	export let data = {}

	let isEditing = false
	let text = data?.text?.param?.data
	let editor = null
	let previewer = null
	let editorNode = null
	let previewNode = null
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

	const editorOptions = {
		locale: 'en_US',
		toolbars: {
			showToolbar: false
		}
	}

	const toggleEditing = () => {
		if (isWidgetDisabled || !+data?.isEditable) return

		isEditing = !isEditing

		if (isEditing) {
			initEditor()
			previewer?.destroy()
			previewer = null
		} else {
			text = editor.getMarkdown()
			editor?.destroy()
			editor = null
			initPreviewer()
		}
	}

	const initEditor = () => {
		editor = new Cherry({
			...editorOptions,
			el: editorNode,
			value: text,
			toolbars: {
				theme: 'dark',
				showToolbar: true
			},
			editor: {
				height: '100%',
				defaultModel: 'edit&preview'
			}
		})
	}

	const initPreviewer = () => {
		previewer = new Cherry({
			...editorOptions,
			el: previewNode,
			value: text,
			toolbars: {
				theme: 'dark',
				showToolbar: false
			},
			editor: {
				height: '100%',
				defaultModel: 'previewOnly'
			}
		})
	}

	+data?.text?.isDisplayed && onMount(initPreviewer)

	onDestroy(() => {
		previewer?.destroy()
		editor?.destroy()
		editorNode?.remove()
		previewNode?.remove()
		previewer = null
		editor = null
	})
</script>

<div class="widget" class:editable={data?.isEditable} class:disabled={isWidgetDisabled} class:isEditing>
	<div class="widget__wrapper">
		<div class="widget__header">
			<h5 class="widget__title">{data?.title}</h5>
			<button type="button" class="widget__edit" on:click={toggleEditing} class:disabled={isEditDisabled}>
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

		<div class="widget__body" bind:this={previewNode}></div>

		{#if +data?.button?.isDisplayed}
			<div class="widget__button" class:disabled={isButtonDisabled}>
				<button type="button" disabled={isButtonDisabled}>{data?.button_name ?? 'Действие'}</button>
			</div>
		{/if}
	</div>
</div>

<div class="modal" class:hidden={!isEditing}>
	<div class="editor" bind:this={editorNode}>
		<button type="button" on:click={toggleEditing}>&cross;</button>
	</div>
</div>

<style lang="scss">
	:global(.modal) {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;

		.editor {
			position: relative;
			width: 800px;
			max-height: 800px;
			border-radius: 10px;
			background: #fff;

			button {
				position: absolute;
				top: 10px;
				right: 10px;
				color: #fff;
				z-index: 999;
				cursor: pointer;
				font-size: 24px;
			}
		}
	}
</style>
