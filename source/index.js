// region import
import { app, Router } from 'hyperapp'

// internal
import view from './view'
// endregion

// start
window.addEventListener('DOMContentLoaded', () =>
	app({
		mixins: [Router],
		view,
	})
)
