<script lang="ts">
	import { darkMode } from '$lib/stores';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import Button from '@smui/button';
	import { auth } from '$lib/database';
	import DarkModeButton from '@components/nav/header/dark-mode-button.svelte';
	import { goto } from '$app/navigation';
	import LoginMenu from './login-menu.svelte';
	import ToggleSearchButton from './toggle-search-button.svelte';

	const { user } = auth;
</script>

<TopAppBar color="primary" variant="fixed">
	<div class="row">
		<Row>
			<Section>
				<Button on:click={() => goto('/')} aria-label="Home" color="secondary">
					<div
						class="material-icons title-button icon-title 
							{$darkMode ? 'dark-icon-title' : 'light-icon-title'}"
					>
						code
					</div>
					<div class="title title-button no-bold">Code.Build</div>
				</Button>
			</Section>
			<Section align="end" toolbar>
				<DarkModeButton />
				<ToggleSearchButton />
				{#if $user}
					<LoginMenu />
				{:else}
					<Button aria-label="Login" title="Login" on:click={() => goto('login')}>
						<span class="no-bold">Login</span>
					</Button>
				{/if}
			</Section>
		</Row>
	</div>
</TopAppBar>

<style>
	.row {
		margin: 0px 10px 0 10px;
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
	}
	.title-button {
		font-weight: normal;
		font-size: 1.5em;
	}
</style>
