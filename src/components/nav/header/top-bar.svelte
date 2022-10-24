<script lang="ts">
	import { darkMode } from '$lib/stores';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import Button from '@smui/button';
	import { auth } from '$lib/database';
	import DarkMode from '@components/nav/header/dark-mode.svelte';
	import { goto } from '$app/navigation';

	const { user, logout } = auth;
</script>

<div class="top-app-bar">
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
					<DarkMode />
					{#if $user}
						<Button aria-label="Logout" on:click={logout} title="logout">
							<span class="no-bold">Logout</span>
						</Button>
					{:else}
						<Button aria-label="Login" title="Login">
							<span class="no-bold">Login</span>
						</Button>
					{/if}
				</Section>
			</Row>
		</div>
	</TopAppBar>
</div>

<style>
	.row {
		margin: 0px 10px 0 10px;
	}
	.no-bold {
		text-transform: none;
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
	.top-app-bar {
		height: 60px;
	}
</style>
