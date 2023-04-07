<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Tag } from '$lib/post.model';
	import Card from '@smui/card';
	import Chip, { Set, Text } from '@smui/chips';
	export let tags: Tag[];
	export let total: number;
</script>

<h3 class="center"><b>Total Posts: {total}</b></h3>
<Card variant="outlined" padded>
	<Set chips={[...tags.map((t) => t.name)]} let:chip>
		<Chip {chip} on:click={() => goto('/t/' + chip)}>
			<Text>{chip}</Text>
		</Chip>
	</Set>
</Card>

<style>
	:global(.center) {
		text-align: center;
	}
</style>
