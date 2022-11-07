<script lang="ts">
	import { darkMode } from '$lib/stores';
	import { goto } from '$app/navigation';
	import type { Tag } from '$lib/post.model';
	import Card from '@smui/card';
	import Chip, { Set, Text } from '@smui/chips';
	export let tags: Tag[];
</script>

<div class="card-container">
	<Card variant="outlined" padded>
		<Set chips={[...tags.map((t) => t.name)]} let:chip>
			<Chip
				class={$darkMode ? 'tag-chips-dark' : 'tag-chips-light'}
				{chip}
				on:click={() => goto('/t/' + chip)}
			>
				<Text>{chip}</Text>
			</Chip>
		</Set>
	</Card>
</div>

<style global>
	.tag-chips-light {
		background-color: #000;
		color: #fff;
	}
	.tag-chips-dark {
		background-color: #1e88e5;
		color: #fff;
	}
</style>
