<script>
	import { onMount } from 'svelte'
	import Project from '../components/Project.svelte'
	import ProjectItem from '../components/Project-item.svelte'
	import Blog from '../components/templates/Blog.svelte'
	import { breadcrumbs } from '../store/breadcrumbs'
	import '/src/styles/project-item.scss'

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
				href: '/all-projects',
				title: 'Все проекты'
			}
		})
	})
</script>

<main class="main all-projects">
	<div class="all-projects__wrapper">
		<div class="all-projects__row">
			<Project title="Основной проект" statusInHead>
				<ProjectItem isEditable={false} title="Наименование">
					<p class="project-item__text">Допустим, чистосердечное признание облегчает душу</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Тариф">
					<p class="project-item__text">Полный</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Описание (анонс)">
					<p class="project-item__text">Шанс</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Финансы">
					<div class="project-item__content">
						<p class="project-item__text">145&nbsp;334 &#8381;</p>
						<div class="project-item__chart">
							<svg
								width="120.000000"
								height="42.000000"
								viewBox="0 0 120 42"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<defs>
									<clipPath id="clip21_2745">
										<rect
											id="Graph"
											width="120.000000"
											height="42.000000"
											fill="white"
											fill-opacity="0"
										/>
									</clipPath>
									<linearGradient
										id="paint_linear_21_2746_0"
										x1="58.777786"
										y1="5.531250"
										x2="58.777786"
										y2="40.500000"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#48AC98" />
										<stop offset="1.000000" stop-color="#48AC98" stop-opacity="0.000000" />
									</linearGradient>
								</defs>
								<rect
									id="Graph"
									width="120.000000"
									height="42.000000"
									fill="#FFFFFF"
									fill-opacity="1.000000"
								/>
								<g clip-path="url(#clip21_2745)">
									<path
										id="Vector 696"
										d="M109.27 8.9L119 4.09L119 40.5L2 40.5L8.55 32.11C9.5 30.9 11.07 30.33 12.57 30.67L14.79 31.17C16.75 31.61 18.73 30.52 19.42 28.64L24.32 15.23C25.29 12.59 28.61 11.75 30.72 13.6L32.68 15.32C33.76 16.28 35.29 16.57 36.65 16.09L39.59 15.04C41.33 14.43 43.26 15.08 44.27 16.62L48.05 22.38C49.41 24.46 52.32 24.81 54.13 23.11L55.3 22.01C57.11 20.31 60.02 20.65 61.39 22.73L64.27 27.13C65.63 29.21 68.54 29.56 70.36 27.86L73.76 24.65C74.55 23.91 75.61 23.52 76.69 23.57L81.41 23.79C82.5 23.84 83.55 23.45 84.34 22.71L90.97 16.48C91.13 16.32 91.29 16.15 91.42 15.98L97.28 8.24C98.46 6.67 100.6 6.2 102.33 7.11L105.63 8.85C106.77 9.45 108.12 9.47 109.27 8.9Z"
										fill="url(#paint_linear_21_2746_0)"
										fill-opacity="0.200000"
										fill-rule="evenodd"
									/>
									<path
										id="Vector 697"
										d="M2 40.5L8.55 32.11C9.5 30.9 11.07 30.33 12.57 30.67L14.79 31.17C16.75 31.61 18.73 30.52 19.42 28.64L24.32 15.23C25.29 12.59 28.61 11.75 30.72 13.6L32.68 15.32C33.76 16.28 35.29 16.57 36.65 16.09L39.59 15.04C41.33 14.43 43.26 15.08 44.27 16.62L48.05 22.38C49.41 24.46 52.32 24.81 54.13 23.11L55.3 22.01C57.11 20.31 60.02 20.65 61.39 22.73L64.27 27.13C65.63 29.21 68.54 29.56 70.36 27.86L73.76 24.65C74.55 23.91 75.61 23.52 76.69 23.57L81.41 23.79C82.5 23.84 83.55 23.45 84.34 22.71L90.97 16.48C91.13 16.32 91.29 16.15 91.42 15.98L97.28 8.24C98.46 6.67 100.6 6.2 102.33 7.11L105.58 8.82C106.74 9.44 108.14 9.44 109.31 8.83L118.5 "
										stroke="#7ECBB6"
										stroke-opacity="1.000000"
										stroke-width="2.000000"
										stroke-linecap="round"
									/>
								</g>
							</svg>
						</div>
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Описание страницы продажи">
					<p class="project-item__text">Допустим чистосердечное признание</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Команда">
					<div class="project-item__team">
						<Blog img="/sergey.jpg" title="Сергей" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Команда">
					<div class="project-item__content">
						<Blog img="/sergey.jpg" title="Сергей" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Ссылка">
					<p class="project-item__text">
						<a href="https://www.chance.ru" target="_blank">https://www.chance.ru</a>
					</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Фото">
					<div class="project-item__team" style="gap: 30px;">
						<div class="person">
							<img src="/michael.jpg" alt="Сергей" />
						</div>
						<div class="person">
							<img src="/michael.jpg" alt="Сергей" />
						</div>
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Текст приветствия">
					<p class="project-item__text">Допустим, чистосердечное признание облегчает душу</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Аватар">
					<div class="project-item__team">
						<Blog img="/michael.jpg" title="Михаил" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Приветственный файл">
					<p class="project-item__text">Допустим, чистосердечное признание облегчает душу</p>
				</ProjectItem>
			</Project>

			<Project title="Дочерний проект">
				<ProjectItem isEditable={false} title="Команда">
					<div class="project-item__team">
						<Blog img="/sergey.jpg" title="Сергей" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Команда">
					<div class="project-item__content">
						<Blog img="/sergey.jpg" title="Сергей" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Ссылка">
					<p class="project-item__text">
						<a href="https://www.chance.ru" target="_blank">https://www.chance.ru</a>
					</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Фото">
					<div class="project-item__team" style="gap: 30px;">
						<div class="person">
							<img src="/michael.jpg" alt="Сергей" />
						</div>
						<div class="person">
							<img src="/michael.jpg" alt="Сергей" />
						</div>
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Текст приветствия">
					<p class="project-item__text">Допустим, чистосердечное признание облегчает душу</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Аватар">
					<div class="project-item__team">
						<Blog img="/michael.jpg" title="Михаил" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Приветственный файл">
					<p class="project-item__text">Допустим, чистосердечное признание облегчает душу</p>
				</ProjectItem>

				<div style="text-align: center;">
					<img class="project__status" src="/project-status.png" alt="Статус проекта" />
				</div>
			</Project>

			<Project title="Дочерний проект">
				<ProjectItem isEditable={false} title="Команда">
					<div class="project-item__team">
						<Blog img="/sergey.jpg" title="Сергей" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Команда">
					<div class="project-item__content">
						<Blog img="/sergey.jpg" title="Сергей" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Ссылка">
					<p class="project-item__text">
						<a href="https://www.chance.ru" target="_blank">https://www.chance.ru</a>
					</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Фото">
					<div class="project-item__team" style="gap: 30px;">
						<div class="person">
							<img src="/michael.jpg" alt="Сергей" />
						</div>
						<div class="person">
							<img src="/michael.jpg" alt="Сергей" />
						</div>
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Текст приветствия">
					<p class="project-item__text">Допустим, чистосердечное признание облегчает душу</p>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Аватар">
					<div class="project-item__team">
						<Blog img="/michael.jpg" title="Михаил" />
					</div>
				</ProjectItem>

				<ProjectItem isEditable={false} title="Приветственный файл">
					<p class="project-item__text">Допустим, чистосердечное признание облегчает душу</p>
				</ProjectItem>

				<div style="text-align: center;">
					<img class="project__status" src="/project-status.png" alt="Статус проекта" />
				</div>
			</Project>
		</div>
	</div>
</main>

<style lang="scss">
	.all-projects {
		&__wrapper {
			padding: 47px 30px 40px 50px;
		}

		&__row {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
			gap: 20px;
		}
	}
</style>
