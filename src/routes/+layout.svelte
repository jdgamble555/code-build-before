<script lang="ts">
	import SubHeader from './../components/nav/sub-header.svelte';
	import { darkMode } from '$lib/stores';
	import Header from '@components/nav/header.svelte';
	import Leftnav from '@components/nav/leftnav.svelte';
	import Rightnav from '@components/nav/rightnav.svelte';
	import Footer from '@components/nav/footer.svelte';
</script>

<main class="{$darkMode ? 'dark' : 'light'}-theme">
	<Header />
	<div class="wrapper">
		<header class="sub-header">
			<SubHeader />
		</header>
		<aside class="rightnav">
			<Rightnav />
		</aside>
		<article class="content">
			<slot></slot>
		</article>
		<nav class="leftnav">
			<Leftnav />
		</nav>
		<footer class="footer">
			<Footer />
		</footer>
	</div>
</main>

<style>
	.sub-header {
		grid-area: sub-header;
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
		margin-top: 20px;
		max-width: 995px;
		width: 100%;
		background-color: transparent !important;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: grid;
		gap: 20px;
		grid-template-areas:
			'sub-header'
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
				'sub-header sub-header'
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
				'sub-header sub-header sub-header'
				'leftnav content rightnav'
				'footer footer footer';
		}
	}
</style>
