<script>
	import { Link } from 'svelte-routing'
	import { auth } from '../store/auth'
	import { breadcrumbs } from '../store/breadcrumbs'
	import { removeTokenFromLocalStorage } from '../utils/token.helper'
	import Skeleton from './ui/Skeleton.svelte'

	export let authHandler = () => {}

	let news = []
	let alert = []
	let account = {}
	let isLoading = false
	let headerBreadcrumbs

	auth.subscribe(data => {
		if (data.filled) {
			news = data.news
			alert = data.alert
			account = data.employer
		}
		isLoading = data.isLoading
	})

	breadcrumbs.subscribe(value => {
		headerBreadcrumbs = value
		document.title = value.current.title || 'Главная'
	})

	const unAuthHandler = () => {
		removeTokenFromLocalStorage()
		window.location.href = 'https://paymall.pw/'
	}
</script>

<header class="header">
	<div class="header__inner">
		<div class="header__page-left">
			<Link to="/" class="logo" on:click={authHandler}
				><img src="/icons/logo.svg" alt="Company logo" /></Link
			>
			{#if headerBreadcrumbs.prev.length}
				<div class="header__page-info">
					<h1 class="header__page-title">
						{headerBreadcrumbs.headTitle ? headerBreadcrumbs.current.title : ''}
					</h1>
					<div class="header__breadcrumbs breadcrumbs">
						{#each headerBreadcrumbs.prev as crumb}
							<span class="breadcrumbs__item breadcrumbs__item--prev">
								<Link to={crumb.href}>{crumb.title}</Link>
							</span>
						{/each}
						<span class="breadcrumbs__item breadcrumbs__item--current">
							<Link to={headerBreadcrumbs.current.href}>{headerBreadcrumbs.current.title}</Link>
						</span>
					</div>
				</div>
			{/if}
		</div>
		<div class="header__actions">
			<nav class="header__menu">
				<ul class="header__menu-list">
					<li class="header__menu-item">
						<button type="button">
							Новости
							<svg
								width="18"
								height="19"
								viewBox="0 0 18 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.41438 8.03151C3.67313 7.70806 4.1451 7.65562 4.46855 7.91438L9.00003 11.5396L13.5315 7.91438C13.855 7.65562 14.3269 7.70806 14.5857 8.03151C14.8444 8.35495 14.792 8.82692 14.4685 9.08568L9.46855 13.0857C9.19463 13.3048 8.80542 13.3048 8.53151 13.0857L3.53151 9.08568C3.20806 8.82692 3.15562 8.35495 3.41438 8.03151Z"
									fill="black"
								/>
							</svg>
						</button>

						<ul class="header__submenu header__submenu-news">
							{#each news as item}
								<li><a href={item.todo} target="_blank">{item.text}</a></li>
							{/each}
						</ul>
					</li>

					<li class="header__menu-item">
						<button type="button">
							Алерт
							<svg
								width="18"
								height="19"
								viewBox="0 0 18 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.41438 8.03151C3.67313 7.70806 4.1451 7.65562 4.46855 7.91438L9.00003 11.5396L13.5315 7.91438C13.855 7.65562 14.3269 7.70806 14.5857 8.03151C14.8444 8.35495 14.792 8.82692 14.4685 9.08568L9.46855 13.0857C9.19463 13.3048 8.80542 13.3048 8.53151 13.0857L3.53151 9.08568C3.20806 8.82692 3.15562 8.35495 3.41438 8.03151Z"
									fill="black"
								/>
							</svg>
						</button>

						<ul class="header__submenu header__submenu-alert">
							{#each alert as item}
								<li><button type="button">{item.text_alert}</button></li>
							{/each}
						</ul>
					</li>
				</ul>
			</nav>

			<div class="header__account account">
				<div class="account__body">
					{#if isLoading}
						<div class="account__avatar">
							<Skeleton width="50px" height="50px" />
						</div>
						<div class="account__info">
							<Skeleton width="70px" height="10px" />
							<span class="account__link" style="margin-top: 10px;display: block;">
								<Skeleton width="70px" height="10px" />
							</span>
						</div>
					{:else}
						<div class="account__avatar">
							<img
								src={account.link_photo ? account.link_photo : '/account-avatar.png'}
								alt="Account avatar"
							/>
						</div>
						<div class="account__info">
							<p class="account__name">{account.user_name}</p>
							<span class="account__link">
								<Link to="/">Профиль</Link>
							</span>
						</div>
					{/if}
				</div>

				<button type="button" on:click={unAuthHandler} class="account__link-leave account__link">
					<img src="/icons/leave.svg" alt="Leave from account" />
				</button>
			</div>
		</div>
	</div>
</header>

<style lang="scss">
	.header {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		right: 0;
		background: #fff;

		&__page-left {
			display: flex;
			align-items: center;
			gap: 22px;
		}

		&__page-info {
			margin-top: 30px;
		}

		&__page-title {
			font-size: 24px;
			font-weight: 700;
			margin-bottom: 10px;
		}

		&__menu-list {
			display: flex;
			align-items: center;
			gap: 15px;
		}

		&__menu-item {
			font-size: 18px;
			position: relative;

			svg {
				transition: transform 0.1s linear;
			}

			&:hover svg {
				transform: rotateZ(180deg);
			}

			&:hover .header__submenu {
				display: block;
			}
		}

		&__submenu {
			display: none;
			position: absolute;
			top: 25px;
			left: -15px;
			overflow: hidden;
			padding: 0 30px;
			border-radius: 5px;
			background: #fff;
			transition: height 0.1s;
			min-width: 150px;
			max-height: 50vh;
			overflow-y: scroll;

			li {
				padding: 20px 0;
				font-size: 16px;
			}

			li:not(:last-child) {
				border-bottom: 1px solid #eeecfb;
			}

			li:hover {
				color: #24cffb;
			}
		}

		&__inner {
			box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 70px;
			max-height: 70px;
			padding: 10px 20px;
		}

		&__actions {
			display: flex;
			align-items: center;
			gap: 35px;
		}
	}

	/* =========== Account =========== */
	.account {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.account__body {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.account__avatar {
		max-width: 45px;
		max-height: 45px;
		overflow: hidden;
		border-radius: 50%;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.account__info {
		text-wrap: pretty;
	}
	.account__name {
		color: #5250d5;
		margin-bottom: 5px;
	}
	.account__link {
		font-weight: 600;

		&-leave {
			cursor: pointer;
		}
	}

	/* =========== Breadcrumbs =========== */
	.breadcrumbs {
		margin-bottom: 30px;

		&__item {
			color: #132143;
		}
		&__item--prev {
			position: relative;
			margin-right: 10px;
			opacity: 0.4;

			&::after {
				content: '/';
				position: absolute;
				top: 50%;
				right: -10px;
				transform: translateY(-50%);
			}
		}
		&__item--current {
		}
	}
</style>
