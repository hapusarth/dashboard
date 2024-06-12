<script>
	import { onMount } from 'svelte'
	import Widget from '../components/Widget.svelte'
	import Blog from '../components/templates/Blog.svelte'
	import Button from '../components/ui/Button.svelte'
	import Skeleton from '../components/ui/Skeleton.svelte'
	import { auth } from '../store/auth'
	import { breadcrumbs } from '../store/breadcrumbs'

	let widgetsData = {}
	let buttonData = []

	auth.subscribe(data => {
		if (data.filled) {
			widgetsData = data.group
			buttonData = Object.values(data.view.menu.button)
		}
	})

	onMount(() => {
		breadcrumbs.set({
			headTitle: false,
			prev: [],
			current: {
				href: '',
				title: ''
			}
		})
	})
</script>

<main class="main">
	<section class="widgets">
		<div class="widgets__inner">
			{#if !$auth.filled}
				{#each new Array(7) as _}
					<Skeleton width="430px" height="350px" />
				{/each}
			{:else}
				<Widget title="Черновики">
					<div class="draft">
						<div class="draft__statuses">
							<div class="draft__status-item status-item">
								<div class="status-item__status-mark status-item__status-mark--new"></div>
								<div class="status-item__status-info-wrap">
									<p class="status-item__status-text">В разработке</p>
									<p class="status-item__status-info" id="status-in-dev">
										{widgetsData.draft.In_developing} блогов
									</p>
								</div>
							</div>
							<div class="draft__status-item status-item">
								<div class="status-item__status-mark status-item__status-mark--pending"></div>
								<div class="status-item__status-info-wrap">
									<p class="status-item__status-text">Требуют подтверждения</p>
									<p class="status-item__status-info" id="status-pending">
										{widgetsData.draft.Waiting_for_confirmation} блогов
									</p>
								</div>
							</div>
							<div class="draft__status-item status-item">
								<div class="status-item__status-mark status-item__status-mark--done"></div>
								<div class="status-item__status-info-wrap">
									<p class="status-item__status-text">Архив</p>
									<p class="status-item__status-info" id="status-done">
										{widgetsData.draft.Archive} блогов
									</p>
								</div>
							</div>
						</div>
						<div class="draft__chart">
							<img src="/project-status.png" alt="Project status" />
						</div>
					</div>
				</Widget>
				<Widget title="Мои блоги">
					<div class="bloggers">
						<ul class="bloggers__list">
							{#each widgetsData.author as item}
								<li class="bloggers__list-item">
									<Blog img={item.icon ? item.icon : '/michael.jpg'} title={item.name} />
								</li>
							{/each}
						</ul>
					</div>
				</Widget>
				<Widget title="Я подписчик">
					<div class="bloggers">
						<ul class="bloggers__list">
							{#each widgetsData.subscriber as item}
								<li class="bloggers__list-item">
									<Blog img={item.icon ? item.icon : '/michael.jpg'} title={item.name} />
								</li>
							{/each}
						</ul>
					</div>
				</Widget>
				<Widget title="Я в команде блоггеров">
					<div class="bloggers">
						<ul class="bloggers__list">
							{#each widgetsData.worker as item}
								<li class="bloggers__list-item">
									<Blog img={item.icon ? item.icon : '/michael.jpg'} title={item.name} />
								</li>
							{/each}
						</ul>
					</div>
				</Widget>
				<Widget title="Реклама">
					<div class="ad">
						<ul class="ad__list">
							<li class="ad__list-item">
								<div class="ad__icon">
									<svg
										width="44"
										height="44"
										viewBox="0 0 44 44"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="22" cy="22" r="22" fill="#FBF2D9" />
										<path
											d="M22.7509 14.1195C22.386 13.5982 21.6139 13.5982 21.249 14.1195L18.5585 17.963L13.9331 19.5048C13.3281 19.7065 13.1088 20.4491 13.5072 20.9471L16.5586 24.7613L16.18 29.3047C16.1253 29.9605 16.7591 30.4586 17.3834 30.2505L22 28.7116L26.6165 30.2505C27.2409 30.4586 27.8746 29.9605 27.8199 29.3047L27.4413 24.7613L30.4927 20.9471C30.8911 20.4491 30.6718 19.7065 30.0668 19.5048L25.4414 17.963L22.7509 14.1195Z"
											fill="#FFCC3D"
										/>
									</svg>
								</div>
								<div class="ad__info">
									<p class="ad__name">4.7 рейтинг</p>
									<p class="ad__text">на основании 46 отзывов</p>
								</div>
							</li>

							<li class="ad__list-item">
								<div class="ad__icon">
									<svg
										width="44"
										height="44"
										viewBox="0 0 44 44"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="22" cy="22" r="22" fill="#ACACE6" />
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M21.9999 28.6667C26.7864 28.6667 30.6666 25.3834 30.6666 21.3333C30.6666 17.2832 26.7864 14 21.9999 14C17.2135 14 13.3333 17.2832 13.3333 21.3333C13.3333 23.4555 14.3986 25.3671 16.1014 26.7062C15.9261 27.7107 15.396 28.5571 14.6624 29.2371C14.318 29.5564 14.4995 30.2269 14.9689 30.2172C16.9518 30.1762 18.7378 29.7859 20.4232 28.5456C20.9345 28.6251 21.4615 28.6667 21.9999 28.6667ZM17.9999 20C17.9999 19.6318 18.2984 19.3333 18.6666 19.3333H25.3333C25.7014 19.3333 25.9999 19.6318 25.9999 20C25.9999 20.3682 25.7014 20.6667 25.3333 20.6667H18.6666C18.2984 20.6667 17.9999 20.3682 17.9999 20ZM18.7079 22.2819C18.3397 22.2819 18.0413 22.5804 18.0413 22.9486C18.0413 23.3168 18.3397 23.6152 18.7079 23.6152H22.7079C23.0761 23.6152 23.3746 23.3168 23.3746 22.9486C23.3746 22.5804 23.0761 22.2819 22.7079 22.2819H18.7079Z"
											fill="white"
										/>
									</svg>
								</div>
								<div class="ad__info">
									<p class="ad__name">2 новых отзыва</p>
									<p class="ad__text">последний был написан 20 июня 2023</p>
								</div>
							</li>

							<li class="ad__list-item">
								<div class="ad__icon">
									<svg
										width="44"
										height="44"
										viewBox="0 0 44 44"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="22" cy="22" r="22" fill="#8AC7E5" />
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M31.3333 21.3333C31.3333 25.3834 27.4531 28.6667 22.6667 28.6667C22.1282 28.6667 21.6012 28.6251 21.09 28.5456C19.4046 29.7859 17.6185 30.1762 15.6357 30.2172C15.1662 30.2269 14.9847 29.5564 15.3291 29.2371C16.0627 28.5571 16.5929 27.7107 16.7681 26.7062C15.0653 25.3671 14 23.4555 14 21.3333C14 17.2832 17.8802 14 22.6667 14C27.4531 14 31.3333 17.2832 31.3333 21.3333ZM22.4213 23.5413C22.0053 23.5413 21.6853 23.8613 21.6853 24.2773C21.6853 24.6933 22.0053 25.0133 22.4213 25.0133C22.8373 25.0133 23.1573 24.6933 23.1573 24.2773C23.1573 23.8613 22.8373 23.5413 22.4213 23.5413ZM22.0015 22.7947H22.8552C22.9369 22.7824 22.9962 22.7118 23.0042 22.6296C23.0621 22.0355 23.4791 21.7109 23.9241 21.3644C24.479 20.9325 25.0773 20.4668 25.0773 19.4027C25.0773 18.2933 24.1173 17.3333 22.5813 17.3333C20.8966 17.3333 20.2476 18.488 20.0617 18.9268C20.0221 19.0202 20.0706 19.1227 20.1643 19.1617L20.8825 19.4603C20.9884 19.5043 21.1119 19.4513 21.1683 19.3515C21.3358 19.0554 21.754 18.5173 22.5813 18.5173C23.3067 18.5173 23.744 18.9547 23.744 19.5093C23.744 20.047 23.3188 20.3662 22.8653 20.7068C22.3471 21.0958 21.792 21.5126 21.792 22.3147C21.792 22.4413 21.804 22.5558 21.8166 22.6413C21.8301 22.7321 21.9097 22.7947 22.0015 22.7947Z"
											fill="white"
										/>
									</svg>
								</div>
								<div class="ad__info">
									<p class="ad__name">4 новых вопроса</p>
									<p class="ad__text">последний был задан 20 июня 2023</p>
								</div>
							</li>
						</ul>
					</div>
				</Widget>
				<Widget title="Планировщик">
					<div class="article">
						<p class="article__timestamp">Сегодня в 15:35</p>
						<h5 class="article__title">Добавили поддержку Честного знака</h5>
						<p class="article__text">
							В разделе «Заказы» появилась специальная кнопка для сканирования маркировки Честный
							знак при обработке заказов FBS
						</p>
					</div>
				</Widget>
				<Widget title="Я писатель">
					<div class="article">
						<p class="article__timestamp">Сегодня в 15:35</p>
						<h5 class="article__title">Добавили поддержку Честного знака</h5>
						<p class="article__text">
							В разделе «Заказы» появилась специальная кнопка для сканирования маркировки Честный
							знак при обработке заказов FBS
						</p>
					</div>
				</Widget>
			{/if}

			<div class="widgets__add">
				<ul class="widgets__variants-add">
					{#each buttonData as items}
						{#each items as item}
							<li class="widgets__variant-add">{item.name}</li>
						{/each}
					{/each}
				</ul>
				<Button classes="widgets__add-widget">
					Добавить
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M14.5856 10.4685C14.3269 10.7919 13.8549 10.8444 13.5315 10.5856L8.99997 6.96044L4.46849 10.5856C4.14505 10.8444 3.67308 10.7919 3.41432 10.4685C3.15556 10.145 3.20801 9.67308 3.53145 9.41432L8.53145 5.41432C8.80537 5.19519 9.19458 5.19519 9.46849 5.41432L14.4685 9.41432C14.7919 9.67308 14.8444 10.145 14.5856 10.4685Z"
							fill="#fff"
						/>
					</svg>
				</Button>
			</div>
		</div>
	</section>
</main>

<style lang="scss">
	:global(.main) {
		padding: 90px 30px 30px 70px;
	}

	/* =========== Widgets =========== */
	.widgets__inner {
		padding: 50px 0 0 50px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 20px;
	}
	.widgets__add {
		position: fixed;
		width: 300px;
		bottom: 40px;
		right: 40px;
	}
	.widgets__variants-add {
		height: 0;
		overflow: hidden;
		padding: 0 30px;
		border-radius: 15px 15px 0 0;
		background: #eeecfb;
		transition: height 0.1s;
	}

	.widgets__variant-add {
		position: relative;
		z-index: 2;
		padding: 20px 0;
		cursor: pointer;
	}

	.widgets__variant-add:not(:last-child) {
		border-bottom: 1px solid #e1e1e1;
	}

	.widgets__variant-add:hover {
		color: #24cffb;
	}

	.widgets__add:hover .widgets__variants-add {
		height: auto;
	}

	.widgets__add-widget svg {
		transition: transform 0.1s linear;
	}
	.widgets__add:hover .widgets__add-widget svg {
		transform: rotateZ(180deg);
	}
	/* =========== Draft =========== */
	.draft {
		display: flex;
		align-items: center;
	}

	.draft__statuses {
		flex: 0 0 50%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.draft__chart {
		flex: 0 0 50%;
		text-align: center;
	}

	.draft__chart img {
		max-width: 100%;
	}
	/* =========== Status-item =========== */
	.status-item {
		display: flex;
	}
	.status-item__status-mark {
		margin: 5px 10px 0 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.status-item__status-mark--new {
		background: #ac9beb;
	}
	.status-item__status-mark--pending {
		background: #fdda77;
	}
	.status-item__status-mark--done {
		background: #7ecbb6;
	}

	.status-item__status-info-wrap {
		max-width: 130px;
	}
	.status-item__status-text {
		color: #747474;
		font-size: 18px;
		margin-bottom: 4px;
	}
	.status-item__status-info {
		font-weight: 500;
		font-size: 18px;
	}

	/* =========== Bloggers =========== */
	.bloggers {
		min-width: 85%;
	}
	.bloggers__list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.bloggers__list-item {
		display: flex;
		justify-content: space-between;
		gap: 60px;
		margin-right: 20%;
	}
	/* =========== Ad =========== */
	.ad {
		min-width: 85%;
	}
	.ad__list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.ad__icon {
		align-self: self-start;
	}
	.ad__list-item {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.ad__name {
		font-weight: 500;
		font-size: 18px;
		margin-bottom: 3px;
	}
	.ad__text {
		color: #747474;
	}
	/* =========== Article =========== */
	.article {
		display: flex;
		flex-direction: column;
		max-width: 85%;
		gap: 10px;
		font-size: 18px;
	}
	.article__timestamp {
		color: #b2b2b2;
	}
</style>
