<script lang="ts">
	import SubHeader from '@components/nav/sub-header.svelte';
	import { darkMode, loading, showLeft } from '$lib/stores';
	import Header from '@components/nav/header.svelte';
	import Leftnav from '@components/nav/leftnav.svelte';
	import Footer from '@components/nav/footer.svelte';
	import Message from '@components/message.svelte';
	import { browser } from '$app/environment';
	import type { LayoutData } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	export let data: LayoutData;

	beforeNavigate(() => loading.set(true));
	afterNavigate(() => loading.set(false));
</script>

<svelte:head>
	<meta name="description" content="Your most relevant coding resources!" />
	<link rel="stylesheet" id="theme" href="/smui{$darkMode ? '-dark' : ''}.css" />
</svelte:head>

{#if browser}
	<Message />
{/if}
<main class="{$darkMode ? 'dark' : 'light'}-theme">
	<Header />
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
</main>

<style global>
	.sub-header {
		grid-area: header;
	}

	.content {
		grid-area: content;
	}

	.leftnav {
		grid-area: leftnav;
		min-width: 180px;
	}

	.footer {
		grid-area: footer;
		text-align: center;
	}

	.wrapper {
		margin-top: 20px;
		margin-right: auto;
		margin-left: auto;
		max-width: 995px;
		width: 95%;
		grid-gap: 20px;
		display: grid;
		grid-template-areas:
			'header'
			'content'
			'leftnav'
			'footer';
	}

	@media (max-width: 699px) {
		.tag_list > li {
			display: inline-block;
			margin-left: 5px;
		}
	}

	.simple-wrapper {
		margin-top: 20px;
		margin-right: auto;
		margin-left: auto;
		max-width: 995px;
		width: 95%;
		display: grid;
		grid-template-areas:
			'header'
			'content'
			'footer';
	}
	.simple-wrapper.content {
		max-width: 100vw;
	}

	.simple-wrapper .leftnav {
		visibility: hidden;
		display: none;
	}

	@media (min-width: 700px) {
		.wrapper {
			grid-template-columns: 1fr 4fr;
			grid-template-rows: 1fr;
			grid-template-areas:
				'header header'
				'leftnav content'
				'footer footer';
		}

		.content {
			max-width: 73vw;
		}

		nav ul {
			flex-direction: column;
		}
	}
</style>
