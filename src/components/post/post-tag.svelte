<script lang="ts">
	import { loadPosts } from '$lib/post-store';
	import type { Optional, Post } from '$lib/post.model';
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';
	import PostList from './post-list.svelte';

	export let posts: Optional<Post[]>;
	export let tag: Optional<string>;
	//export let total: number;

	loadPosts.tag = tag;
	loadPosts.current = posts;
	loadPosts.refresh();
	const { posts: p } = loadPosts;
</script>

<div class="card-filler">
	{#if $loading}
		<Loader />
	{:else}
		<PostList posts={$p} />
	{/if}
</div>
