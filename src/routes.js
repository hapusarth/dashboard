import AllProjects from './pages/All-projects.svelte'
import CreateFactory from './pages/Create-factory.svelte'
import ListFactory from './pages/List-factory.svelte'
import MainProject from './pages/Main-project.svelte'
import Main from './pages/Main.svelte'
import TypeProject from './pages/Type-project.svelte'

export const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/type-project',
		component: TypeProject
	},
	{
		path: '/factory-templ',
		component: TypeProject
	},
	{
		path: '/main-project',
		component: MainProject
	},
	{
		path: '/create-factory',
		component: CreateFactory
	},
	{
		path: '/all-projects',
		component: AllProjects
	},
	{
		path: '/list-factory',
		component: ListFactory
	},
	{
		path: '*',
		component: Main
	},
]
