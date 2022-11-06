<script lang="ts">
	import TopBar from './header/top-bar.svelte';
	import '@styles/global.scss';
	import { showSearch } from '$lib/stores';
	import Loader from './loader.svelte';
</script>

<div class="top-app-bar">
	{#if $showSearch}
		{#await import('./header/search-bar.svelte')}
			<div class="centered">
				<Loader />
			</div>
		{:then SearchBar}
			<SearchBar.default />
		{/await}
	{:else}
		<TopBar />
	{/if}
</div>

<style>
	.centered {
		text-align: center;
	}
	.top-app-bar {
		height: 60px;
	}
</style>
