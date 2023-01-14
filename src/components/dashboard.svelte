<script lang="ts">
	import Card, { Content } from '@smui/card';
	import { settings } from '$lib/settings';
	import DashboardTabs from './post/dashboard-tabs.svelte';
	import type { UserRec } from '$lib/user.model';

	export let user: UserRec;
</script>

<svelte:head>
	<title>{settings.sitename}</title>
</svelte:head>

<Card variant="outlined" padded>
	<Content class="centered">
		<h4 class="title-home">Welcome {user?.displayName || 'New User'}!</h4>
	</Content>
</Card>
<DashboardTabs {user} />

<style>
	.title-home {
		font-size: 2.5rem !important;
	}
</style>
