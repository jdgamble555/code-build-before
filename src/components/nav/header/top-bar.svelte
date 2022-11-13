<script lang="ts">
	import { darkMode } from '$lib/stores';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import Button from '@smui/button';
	import { auth } from '$lib/database';
	import DarkModeButton from '@components/nav/header/dark-mode-button.svelte';
	import { goto } from '$app/navigation';
	import SearchButton from './search-button.svelte';
	import { settings } from '$lib/settings';
	import Loader from '@components/nav/loader.svelte';

	const { user } = auth;
</script>

<TopAppBar variant="fixed">
	<div class="row {$darkMode ? 'top-color-dark' : 'top-color-light'}">
		<Row>
			<Section>
				<Button on:click={() => goto('/')} aria-label="Home">
					<div
						class="material-icons title-button icon-title 
							{$darkMode ? 'dark-icon-title' : 'light-icon-title'}"
					>
						{settings.siteicon}
					</div>
					<div class="title title-button no-bold">{settings.sitename}</div>
				</Button>
			</Section>
			<Section align="end" toolbar>
				<DarkModeButton />
				<SearchButton />
				{#if $user}
					{#await import('./login-menu.svelte')}
						<div class="centered">
							<Loader />
						</div>
					{:then LoginMenu}
						<LoginMenu.default />
					{/await}
				{:else}
					<Button aria-label="Login" title="Login" on:click={() => goto('login')}>
						<span class="no-bold">Login</span>
					</Button>
				{/if}
			</Section>
		</Row>
	</div>
</TopAppBar>

<style global>
	.top-color {
		background-color: #1e88e5 !important;
		color: #fff !important;
		margin: 0 !important;
	}
	.top-color-dark {
		background-color: #000 !important;
	}
	.top-color-light {
		background-color: #1e88e5 !important;
	}
	.row {
		margin: 0;
	}
	.icon-title {
		font-weight: bolder;
		font-size: 2em !important;
		margin-top: 0.1em;
	}
	.dark-icon-title {
		color: #4fc3f7;
	}
	.light-icon-title {
		color: #000;
	}
	.title {
		padding-left: 20px;
		color: #fff;
	}
	.title-button {
		font-weight: normal;
		font-size: 1.5em;
	}
</style>
