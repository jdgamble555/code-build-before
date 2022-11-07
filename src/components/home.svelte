<script lang="ts">
	import Card, { Content } from '@smui/card';
	import { settings } from '$lib/settings';
</script>

<svelte:head>
	<title>{settings.sitename}</title>
</svelte:head>

<Card variant="outlined" padded>
	<Content class="centered">
		<h1>Welcome to {settings.sitename}!</h1>

		An easier way to code your web applications !
	</Content>
</Card>
