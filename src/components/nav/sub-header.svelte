<script lang="ts">
	import { goto } from '$app/navigation';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { darkMode } from '$lib/stores';
	import Button, { Icon, Label } from '@smui/button';

	const crumbs = breadcrumbs().crumbs;
</script>

<Button color="primary" on:click={() => goto('/')}>
	<Icon class="material-icons {$darkMode ? 'blue' : ''}">home</Icon>
	<Label class="no-bold {$darkMode ? 'white' : ''}">Home</Label>
</Button>

{#each $crumbs as c}
	<Button color="primary" on:click={() => goto(c.location)}>
		<Icon class="material-icons right {$darkMode ? 'white' : ''}">arrow_forward_ios</Icon>
		<Label class="no-bold {$darkMode ? 'white' : ''}">{c.name}</Label>
	</Button>
{/each}
