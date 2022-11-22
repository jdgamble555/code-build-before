<script lang="ts">
	import type { Optional, Post } from '$lib/post.model';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { getContext } from 'svelte';
	import PostList from './post-list.svelte';
	import { LightPaginationNav } from 'svelte-paginate';
	import { loadPosts, type postsType } from '$lib/post-store';
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';

	const _posts = getContext<Optional<Post[]>>('posts');
	loadPosts.current = _posts;
	loadPosts.refresh();
	const { posts } = loadPosts;

	const total = getContext<number>('total');

	const _types: { [key: string]: postsType } = {
		New: 'new',
		Updated: 'updated',
		Top: 'top'
	};

	let active = 'New';
</script>

<div class="card-filler">
	<TabBar
		tabs={['New', 'Updated', 'Top']}
		let:tab
		bind:active
		on:click={() => {
			loadPosts.type = _types[active];
			loadPosts.refresh();
		}}
	>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#if $loading}
		<Loader />
	{:else}
		<PostList posts={$posts} />
	{/if}
</div>

<LightPaginationNav
	totalItems={total}
	pageSize={5}
	currentPage={loadPosts.page}
	limit={1}
	showStepOptions={true}
	on:setPage={(e) => {
		loadPosts.page = e.detail.page;
		loadPosts.refresh();
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
