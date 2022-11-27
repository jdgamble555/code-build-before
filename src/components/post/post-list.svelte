<script lang="ts">
	import { getPosts, posts } from '$lib/post-store';
	import type { sortFields } from '$lib/post.model';
	import { LightPaginationNav } from 'svelte-paginate';
	import PostDetail from './post-detail.svelte';

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
			getPosts({ sortField: type, page: e.detail.page, tag });
		}}
	/>
{/if}

<style global>
	.light-pagination-nav.svelte-bxgrui .pagination-nav {
		border: none;
		box-shadow: none !important;
	}
	.card-filler {
		min-height: 600px;
	}
</style>
