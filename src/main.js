import './styles/reset.css'

import './styles/app.scss'

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props: {
    url: window.location.pathname
  }
})

export default app
