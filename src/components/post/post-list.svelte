<script lang="ts">
	import { currentPage, posts } from '$lib/post-store';
	import { loading } from '$lib/stores';
	import { LightPaginationNav } from 'svelte-paginate';
	import PostDetail from './post-detail.svelte';
	import { read_post } from '$lib/database';
	import type { types } from '$lib/post.model';

	const { getPosts } = read_post;

	const turnPage = (e: CustomEvent<any>) => {
		loading.set(true);
		currentPage.set(e.detail.page);
		getPosts({ type, page: e.detail.page, filter }).then((p) => {
			posts.set(p.data ?? []);
			loading.set(false);
		});
	};

	export let total: Number;
	export let type: types | undefined = undefined;
	export let filter: string | undefined = undefined;
</script>

{#if $posts}
	{#each $posts as post}
		<PostDetail {post} />
	{/each}
	<LightPaginationNav
		totalItems={total}
		pageSize={5}
		currentPage={$currentPage}
		limit={1}
		showStepOptions={true}
		on:setPage={turnPage}
	/>
{/if}
