<script lang="ts">
	import type { Optional, Post } from '$lib/post.model';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import PostDetail from './post-detail.svelte';

	let active = 'New';

	export let posts: Optional<Post[]>;

</script>

<div>
	<TabBar tabs={['New', 'Updated', 'Top']} let:tab bind:active>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#if active === 'New' && posts}
		{#each posts as post}
			<PostDetail {post} />
		{/each}
	{:else if active === 'Updated'}
		updater
	{:else}
		top
	{/if}
</div>
