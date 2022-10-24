<script lang="ts">
	import { darkMode } from '$lib/stores';
	import IconButton from '@smui/icon-button';
</script>

<svelte:head>
	<meta name="description" content="Your most relevant coding resources!" />
	<link rel="stylesheet" id="theme" href="/smui{$darkMode ? '-dark' : ''}.css" />
</svelte:head>

<IconButton
	on:click={() => darkMode.update((m) => !m)}
	class="material-icons"
	aria-label="{$darkMode ? 'Light' : 'Dark'} Mode"
	title="{$darkMode ? 'Light' : 'Dark'} Mode"
>
	{$darkMode ? 'brightness_7' : 'brightness_4'}
</IconButton>
