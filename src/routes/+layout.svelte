<script lang="ts">
	import { darkMode } from '$lib/stores';
	import Header from '@components/nav/header.svelte';
	//import Content from '@components/nav/content.svelte';
	import Leftnav from '@components/nav/leftnav.svelte';
	import Rightnav from '@components/nav/rightnav.svelte';
	import Footer from '@components/nav/footer.svelte';
</script>

<div class="wrapper {$darkMode ? 'dark' : 'light'}-theme">
	<header class="header">
		<Header />
	</header>
	<aside class="rightnav">
		<Rightnav />
	</aside>
	<article class="content">
		<slot />
	</article>
	<nav class="leftnav">
		<Leftnav />
	</nav>
	<footer class="footer">
		<Footer />
	</footer>
</div>

<style>
	.header {
		grid-area: header;
	}
	.content {
		grid-area: content;
	}
	.rightnav {
		margin-right: 20px;
		grid-area: rightnav;
	}
	.leftnav {
		margin-left: 20px;
		grid-area: leftnav;
	}
	.footer {
		grid-area: footer;
		text-align: center;
	}
	.wrapper {
		display: grid;
		gap: 20px;
		grid-template-areas:
			'header'
			'rightnav'
			'content'
			'leftnav'
			'footer';
	}
	@media (min-width: 500px) {
		.wrapper {
			grid-template-columns: 1fr 3fr;
			grid-template-rows: 0fr 0fr 1fr;
			grid-template-areas:
				'header header'
				'rightnav content'
				'leftnav content'
				'footer footer';
		}
	}
	@media (min-width: 700px) {
		.wrapper {
			grid-template-columns: 1fr 3fr 1fr;
			grid-template-rows: 1fr;
			grid-template-areas:
				'header header header'
				'leftnav content rightnav'
				'footer footer footer';
		}
	}
</style>

