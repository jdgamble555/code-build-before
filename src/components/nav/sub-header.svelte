<script lang="ts">
	import { goto } from '$app/navigation';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import Button, { Icon, Label } from '@smui/button';

	const crumbs = breadcrumbs().crumbs;
</script>

<Button color="secondary" on:click={() => goto('/')}>
	<Icon class="material-icons">home</Icon>
	<Label class="no-bold">Home</Label>
</Button>

{#each $crumbs as c}
	<Button color="secondary" on:click={() => goto(c.location)}>
		<Icon class="material-icons">arrow_forward_ios</Icon>
		<Label class="no-bold">{c.name}</Label>
	</Button>
{/each}
