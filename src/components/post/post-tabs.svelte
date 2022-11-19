<script lang="ts">
	import type { Optional, Post } from '$lib/post.model';
	import Loader from '@components/nav/loader.svelte';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { getContext } from 'svelte';
	import PostList from './post-list.svelte';
	import { LightPaginationNav } from 'svelte-paginate';
	import { loadPosts, postsCache } from '$lib/post-store';

	const _posts = getContext<Optional<Post[]>>('posts');
	const total = getContext<number>('total');

	// add server query to cache
	postsCache.update((updater) => updater.set('New_1', _posts));

	let firstload = true;
	let currentPage = 1;
	let active = 'New';
</script>

<div class="card-filler">
	<TabBar
		tabs={['New', 'Updated', 'Top']}
		let:tab
		bind:active
		on:click={() => {
			firstload = false;
			currentPage = 1;
		}}
	>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#if firstload}
		<PostList posts={_posts} />
	{:else}
		{#await loadPosts({ type: active, page: currentPage })}
			<Loader />
		{:then posts}
			<PostList {posts} />
		{/await}
	{/if}
</div>

<LightPaginationNav
	on:click={() => (firstload = false)}
	totalItems={total}
	pageSize={5}
	{currentPage}
	limit={1}
	showStepOptions={true}
	on:setPage={(e) => {
		currentPage = e.detail.page;
		firstload = false;
	}}
/>

<style global>
	.light-pagination-nav.svelte-bxgrui .pagination-nav {
		border: none;
		box-shadow: none !important;
	}
	.card-filler {
		min-height: 600px;
	}
</style>
