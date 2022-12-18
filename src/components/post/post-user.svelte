<script lang="ts">
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';
	import PostList from './post-list.svelte';
	import { page } from '$app/stores';
	import { posts } from '$lib/post-store';

	posts.set($page.data.posts);
</script>

<div class="card-filler">
	{#if $loading}
		<Loader />
	{:else}
		<PostList total={$page.data.total} filter={$page.data.uid} type="author" />
	{/if}
</div>
