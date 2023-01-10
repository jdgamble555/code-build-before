<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/database';
	import Login from '@components/login.svelte';

	const { user } = auth;
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if $user && !$user.loading}
	{goto('/')}
{:else}
	<Login />
{/if}
