<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/database';
	import Dashboard from '@components/dashboard.svelte';
	import Loader from '@components/nav/loader.svelte';

	const { user } = auth;
</script>

{#if browser}
	{#if $user.loading}
		<div class="centered">
			<Loader />
		</div>
	{:else if !$user.data}
		{goto('/login')}
	{:else}
		<Dashboard user={$user.data} />
	{/if}
{/if}
