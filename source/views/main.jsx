// region import
import { h } from 'hyperapp'

// components
import Footer from '../components/footer'
import Header from '../components/header'

// internal
import '../style.sass'
// endregion

export default () =>
	<div class="app">
		<Header />
		<h1>Dodekeract.com</h1>
		<main>Some Content</main>
		<aside>Sidebar</aside>
		<Footer />
	</div>
