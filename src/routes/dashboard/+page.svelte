<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/database';
	import Dashboard from '@components/dashboard.svelte';
	import Loader from '@components/nav/loader.svelte';

	const { getUser } = auth;
</script>

{#if browser}
	{#await getUser()}
		<div class="centered">
			<Loader />
		</div>
	{:then _user}
		{#if _user}
			<Dashboard user={_user} />
		{:else}
			{goto('/login')}
		{/if}
	{/await}
{/if}
