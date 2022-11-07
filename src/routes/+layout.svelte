<script lang="ts">
	import SubHeader from '@components/nav/sub-header.svelte';
	import { darkMode, showLeft, showRight } from '$lib/stores';
	import Header from '@components/nav/header.svelte';
	import Leftnav from '@components/nav/leftnav.svelte';
	import Rightnav from '@components/nav/rightnav.svelte';
	import Footer from '@components/nav/footer.svelte';
	import Message from '@components/message.svelte';
	import { browser } from '$app/environment';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

{#if browser}
	<Message />
{/if}
<main class="{$darkMode ? 'dark' : 'light'}-theme">
	<Header />
	<div class={$showLeft && showRight ? 'wrapper' : 'simple-wrapper'}>
		<header class="sub-header">
			<SubHeader />
		</header>
		<aside class="rightnav {$showRight ? 'show' : 'hide'}">
			<Rightnav />
		</aside>
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

<style global lang="scss">
	.simple-wrapper {
		margin-top: 20px;
		left: 50%;
		transform: translateX(-50%);
		gap: 20px;
		//text-align: center;
		max-width: 995px;
		width: 100%;
		position: absolute;
		display: grid;
		grid-template-areas:
			'sub-header'
			'content'
			'footer';
		.content {
			max-width: 100vw;
		}
	}
	.hide {
		visibility: hidden;
		display: none;
	}
	.show {
		visibility: visible;
		display: block;
	}
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
