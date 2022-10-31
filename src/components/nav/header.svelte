<script lang="ts">
	import TopBar from './header/top-bar.svelte';
	import '@styles/global.scss';
	import { showSearch } from '$lib/stores';
	import SearchBar from './header/search-bar.svelte';
</script>

<div class="top-app-bar">
	{#if $showSearch}
		<SearchBar />
	{:else}
		<TopBar />
	{/if}
</div>

<style>
	.top-app-bar {
		height: 60px;
	}
</style>
