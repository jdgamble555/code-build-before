<script lang="ts">
	import PostTabs from './post/post-tabs.svelte';
	import Card, { Content } from '@smui/card';
	import { settings } from '$lib/settings';	
</script>

<svelte:head>
	<title>{settings.sitename}</title>
</svelte:head>

<Card variant="outlined" padded>
	<Content class="centered">
		<h1 class="title-home">{settings.sitename}</h1>

		An easier way to code your web applications !
	</Content>
</Card>
<PostTabs />

<style>
	.title-home {
		font-size: 2.5rem !important;
	}	
</style>
