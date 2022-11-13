<script lang="ts">
	import { darkMode } from '$lib/stores';
	import IconButton from '@smui/icon-button';
</script>

<IconButton
	on:click={() => darkMode.update((m) => !m)}
	class="material-icons white"
	aria-label="{$darkMode ? 'Light' : 'Dark'} Mode"
	title="{$darkMode ? 'Light' : 'Dark'} Mode"
>
	{$darkMode ? 'brightness_7' : 'brightness_4'}
</IconButton>
