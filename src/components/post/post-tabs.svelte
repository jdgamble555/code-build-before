<script lang="ts">
	import type { Optional, Post } from '$lib/post.model';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { getContext } from 'svelte';
	import PostList from './post-list.svelte';

	let active = 'New';

	const posts = getContext<Optional<Post[]>>('posts');
</script>

<div>
	<TabBar tabs={['New', 'Updated', 'Top']} let:tab bind:active>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#if active === 'New'}
		<PostList {posts} />
	{:else if active === 'Updated'}
		updater
        <!-- use await here for updated -->
	{:else}
		top
        <!-- user await here for top -->
	{/if}
</div>
