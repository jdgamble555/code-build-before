<script lang="ts">
	import type { Optional, Post } from '$lib/post.model';
	import PostDetail from './post-detail.svelte';

	export let posts: Optional<Post[]>;
</script>

{#if posts}
	{#each posts as post}
		<PostDetail {post} />
	{/each}
{/if}
