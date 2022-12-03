<script lang="ts">
	import { posts } from '$lib/post-store';
	import type { sortFields } from '$lib/post.model';
	import { loading } from '$lib/stores';
	import { LightPaginationNav } from 'svelte-paginate';
	import PostDetail from './post-detail.svelte';
	import { read_post } from '$lib/database';

	const { getPosts } = read_post;

	let currentPage = 1;

	export let total: Number;
	export let type: sortFields = 'createdAt';
	export let tag: string | undefined = undefined;
</script>

{#if $posts}
	{#each $posts as post}
		<PostDetail {post} />
	{/each}
	<LightPaginationNav
		totalItems={total}
		pageSize={5}
		{currentPage}
		limit={1}
		showStepOptions={true}
		on:setPage={(e) => {
			currentPage = e.detail.page;
			loading.set(true);
			getPosts({ sortField: type, page: e.detail.page, tag }).then((p) => {
				posts.set(p.data ?? []);
				loading.set(false);
			});
		}}
	/>
{/if}
