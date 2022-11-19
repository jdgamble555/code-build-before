<script lang="ts">
	import { read_post } from '$lib/database';
	import type { Optional, Post } from '$lib/post.model';
	import Loader from '@components/nav/loader.svelte';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { getContext } from 'svelte';
	import PostList from './post-list.svelte';
	import { LightPaginationNav } from 'svelte-paginate';

	const { getPosts } = read_post;

	const _posts = getContext<Optional<Post[]>>('posts');
	const total = getContext<number>('total');

	let currentPage = 1;

	let active = 'New';
	let lastTab = 'New';

	const postsCache = new Map<string, Optional<Post[]>>();
	postsCache.set('new_1', _posts);

	const loadPosts = async ({ page, type }: { page: number; type: string }) => {

		// reset page number if tab change
		if (type !== lastTab) {
			currentPage = 1;
		}
		lastTab = type;

		// save posts cache
		const cacheName = type + '_' + page.toString();
		const r = postsCache.get(cacheName);
		if (r) {
			return r;
		}

		// get posts sort
		let sortF: Optional<string>;
		if (type === 'Top') {
			sortF = 'heartsCount';
		} else if (type === 'Updated') {
			sortF = 'updatedAt';
		} else {
			sortF = undefined;
		}

		// get posts
		const { error, data: newR } = await getPosts({ sortField: sortF, page });
		if (error) {
			console.error(error);
			return [];
		} else {

			// save cache
			postsCache.set(cacheName, newR);
			return newR;
		}
	};
</script>

<div>
	<TabBar tabs={['New', 'Updated', 'Top']} let:tab bind:active>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#await loadPosts({ type: active, page: currentPage })}
		<Loader />
	{:then posts}
		<PostList {posts} />
	{/await}
</div>

<LightPaginationNav
	totalItems={total}
	pageSize={5}
	{currentPage}
	limit={1}
	showStepOptions={true}
	on:setPage={(e) => (currentPage = e.detail.page)}
/>

<style global>
	.light-pagination-nav.svelte-bxgrui .pagination-nav {
		border: none;
		box-shadow: none !important;
	}
</style>
