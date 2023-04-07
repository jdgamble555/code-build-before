<script lang="ts">
	import SubHeader from '@components/nav/sub-header.svelte';
	import { darkMode, loading, showLeft } from '$lib/stores';
	import Header from '@components/nav/header.svelte';
	import Leftnav from '@components/nav/leftnav.svelte';
	import Footer from '@components/nav/footer.svelte';
	import Message from '@components/message.svelte';
	import type { LayoutData } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Analytics from '$lib/analytics.svelte';

	export let data: LayoutData;

	beforeNavigate(() => loading.set(true));
	afterNavigate(() => loading.set(false));
</script>

<Analytics />

<svelte:head>
	<link rel="stylesheet" id="theme" href="/smui{$darkMode ? '-dark' : ''}.css" />
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6532644608556126"
		crossorigin="anonymous"
	></script>
</svelte:head>

<Message />
<main class="{$darkMode ? 'dark' : 'light'}-theme">
	<Header />
	<div class="content-container">
		<div class={$showLeft ? 'wrapper' : 'simple-wrapper'}>
			<header class="sub-header">
				<SubHeader />
			</header>
			<article class="content">
				<slot />
			</article>
			<nav class="leftnav {$showLeft ? 'show' : 'hide'}">
				<Leftnav tags={data.tags.data || []} total={data.total || 0} />
			</nav>
			<footer class="footer">
				<Footer />
			</footer>
		</div>
	</div>
</main>

<style lang="scss">
	.content-container {
		display: flex;
		justify-content: center;
	}
	.sub-header {
		margin-top: 20px;
		grid-area: sub-header;
	}

	.content {
		grid-area: content;
	}

	.leftnav {
		grid-area: leftnav;
	}

	.footer {
		grid-area: footer;
		text-align: center;
	}

	.wrapper {
		max-width: 995px;
		width: 95%;
		grid-gap: 20px;
		display: grid;
		grid-template-columns: minmax(350px, 600px);
		grid-template-areas:
			'sub-header'
			'content'
			'leftnav'
			'footer';
	}

	@media (max-width: 699px) {
		:global(.tag_list > li) {
			display: inline-block;
			margin-left: 5px;
		}
	}

	.simple-wrapper {
		max-width: 995px;
		width: 95%;
		display: grid;
		grid-template-columns: minmax(350px, 955px);
		grid-template-areas:
			'sub-header'
			'content'
			'footer';
	}

	.simple-wrapper .leftnav {
		visibility: hidden;
		display: none;
	}

	@media (min-width: 700px) {
		.wrapper {
			grid-template-columns: 180px minmax(450px, 775px);
			grid-template-rows: 1fr;
			grid-template-areas:
				'sub-header sub-header'
				'leftnav content'
				'footer footer';
		}

		:global(nav ul) {
			flex-direction: column;
		}
	}
</style>
