<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/database';
	import Login from '@components/login.svelte';

	const { user } = auth;
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if browser}
	{#if $user}
		{goto('/')}
	{:else}
		<Login />
	{/if}
{/if}
