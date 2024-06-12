<script>
	import 'cherry-markdown/dist/cherry-markdown.css'
	import { onMount } from 'svelte'
	import { Link } from 'svelte-routing'
	import { Factory } from '../api/factory'
	import WidgetGetId from '../components/templates/Widget-get-id.svelte'
	import WidgetGoto from '../components/templates/Widget-goto.svelte'
	import WidgetLoad from '../components/templates/Widget-load.svelte'
	import WidgetTextEdit from '../components/templates/Widget-text-edit.svelte'
	import WidgetText from '../components/templates/Widget-text.svelte'
	import Button from '../components/ui/Button.svelte'
	import Skeleton from '../components/ui/Skeleton.svelte'
	import { auth } from '../store/auth'
	import { breadcrumbs } from '../store/breadcrumbs'

	let widgetsData
	const editedData = {
		data: {
			templateId: '1'
		},
		files: {}
	}
	let isLoading = false

	const typeNameToComponent = {
		text: WidgetText,
		load: WidgetLoad,
		getid: WidgetGetId,
		goto: WidgetGoto,
		textEdit: WidgetTextEdit
	}

	// Запрос для получения данных при создании фабрики
	const fetchFactoryData = async () => {
		try {
			isLoading = true
			const response = await Factory.getEmpty()

			widgetsData = Object.values(response.data)
			auth.update(prev => ({
				...prev,
				alert: response.alert,
				news: response.news,
				view: response.view
			}))
		} catch (e) {
			alert(e)
		} finally {
			isLoading = false
		}
	}

	// Запрос для создания фабрики
	const createFactory = async () => {
		try {
			isLoading = true
			const response = await Factory.createNew(editedData.data.nameFactory)

			editedData.data.factoryId = response.data.factoryId
			widgetsData = Object.values(response.data)
			auth.update(prev => ({
				...prev,
				alert: response.alert,
				news: response.news,
				view: response.view
			}))
		} catch (e) {
			alert(e)
		} finally {
			isLoading = false
		}
	}

	// Запрос для обновления фабрики
	const updateFactory = async () => {
		try {
			isLoading = true

			const formData = new FormData()
			formData.set('data', JSON.stringify(editedData.data))
			Object.keys(editedData.files).forEach(key => formData.set(key, editedData.files[key]))

			const response = await Factory.update(formData)
			widgetsData = Object.values(response.data)

			auth.update(prev => ({
				...prev,
				alert: response.alert,
				news: response.news,
				view: response.view
			}))
		} catch (e) {
			alert(e)
		} finally {
			isLoading = false
		}
	}

	const onChangeWidgetData = ({ detail }) => {
		editedData.data[detail.nameId] = detail.text.param.data
	}

	const onLoadFile = ({ detail }) => {
		editedData.data[detail.name] = detail.fileMeta
		editedData.files[detail.name] = detail.file
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
				href: '/main-project',
				title: 'Основной проект'
			}
		})
	})

	$: {
		if ($auth.filled && !$auth.isLoading && !widgetsData) {
			fetchFactoryData()
		}
	}
</script>

<main class="main main-project">
	<div class="main-project__wrapper">
		<div class="main-project__content">
			<div class="main-project__items">
				{#if !isLoading && widgetsData}
					{#each widgetsData as widget}
						<svelte:component
							this={typeNameToComponent[widget.typeName]}
							data={widget}
							on:change={onChangeWidgetData}
							on:loadFile={onLoadFile}
						/>
					{/each}
				{:else}
					{#each new Array(7) as _}
						<Skeleton height="200px" width="auto" />
					{/each}
				{/if}
			</div>

			<div class="main-project__info">
				<div class="main-project__info-header">
					{#if isLoading}
						<Skeleton width="180px" height="180px" />
					{:else}
						<img src="/project-status.png" alt="Статус проекта" />
					{/if}
				</div>

				<div class="main-project__info-footer">
					<Button
						disabled={isLoading}
						onClick={editedData.data.factoryId ? updateFactory : createFactory}
						>Сохранить и продолжить</Button
					>
					<Link to="/" style="flex: 1 0 40%;"
						><Button disabled={isLoading} type="outline">Отменить</Button></Link
					>
				</div>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.main-project__wrapper {
		padding: 50px 0 40px 50px;
	}

	.main-project {
		&__content {
			display: grid;
			grid-template-columns: 1fr 0.2fr;
			gap: 30px;
		}
		&__items {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
			gap: 20px;
		}

		&__info-header {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&__info-footer {
			position: fixed;
			width: 700px;
			bottom: 30px;
			right: 30px;
			display: flex;
			gap: 10px;
		}
	}
</style>
