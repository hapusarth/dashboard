<script>
	import { onMount } from 'svelte'
	import Blog from '../components/templates/Blog.svelte'
	import { breadcrumbs } from '../store/breadcrumbs'

	onMount(() => {
		breadcrumbs.set({
			headTitle: false,
			prev: [
				{
					href: '/',
					title: 'Главная'
				}
			],
			current: {
				href: '/list-factory',
				title: 'Авторские каналы'
			}
		})
	})
</script>

<main class="main author-channels">
	<div class="author-channels__wrapper">
		<section class="channels">
			<table class="channels__table" bgcolor="white">
				<thead class="channels__table-head">
					<tr>
						<th>Проект</th>
						<th>Проект</th>
						<th>Проект</th>
						<th>Проект</th>
						<th>Проект</th>
						<th>Проект</th>
						<th>Проект</th>
						<th>Проект</th>
					</tr>
				</thead>
				<tbody class="channels__table-body">
					<tr>
						<td>
							<div class="channels__project person">
								<Blog img="/michael.jpg" title="Название" />
							</div>
						</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
					</tr>
					<tr>
						<td>
							<div class="channels__project person">
								<Blog img="/michael.jpg" title="Название" />
							</div>
						</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
					</tr>
					<tr>
						<td>
							<div class="channels__project person">
								<Blog img="/michael.jpg" title="Название" />
							</div>
						</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
					</tr>
					<tr>
						<td>
							<div class="channels__project person">
								<Blog img="/michael.jpg" title="Название" />
							</div>
						</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
					</tr>
					<tr>
						<td>
							<div class="channels__project person">
								<Blog img="/michael.jpg" title="Название" />
							</div>
						</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
					</tr>
					<tr>
						<td>
							<div class="channels__project">
								<Blog img="/michael.jpg" title="Название" />
							</div>
						</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
						<td>@blogger.21</td>
					</tr>

					<!-- внутренний отступ вниз внутри таблицы -->
					<tr style="height: 80px;">
						<td></td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</main>

<style lang="scss">
	.author-channels__wrapper {
		padding: 50px 30px 40px 47px;
	}

	.channels {
		&__table {
			width: 100%;
			border-collapse: collapse;
			border-radius: 10px;
			box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.05);

			td {
				font-size: 18px;
				padding: 20px 50px 20px 0;
				vertical-align: middle;
			}
			td:first-child,
			th:first-child {
				padding-left: 20px;
			}
			td:last-child,
			th:last-child {
				padding-right: 120px;
			}
		}
		&__table-head {
			th {
				padding: 20px 0;
				text-align: left;
				font-size: 20px;
				font-weight: 700;
			}
		}
		&__table-body {
			tr {
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			}
			tr:last-child {
				margin-bottom: 80px;
			}
		}

		&__project {
			img {
				max-width: 40px;
				max-height: 40px;
			}
		}
	}
</style>
