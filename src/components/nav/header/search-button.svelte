<script lang="ts">
	import { showSearch } from '$lib/stores';
	import IconButton from '@smui/icon-button';
</script>

<IconButton
	on:click={() => showSearch.update((m) => !m)}
	class="material-icons white"
	aria-label="Search"
	title="Search"
>
	search
</IconButton>
