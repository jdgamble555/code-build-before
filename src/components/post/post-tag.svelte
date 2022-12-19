<script lang="ts">
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';
	import PostList from './post-list.svelte';
	import { page } from '$app/stores';
	import { postList } from '$lib/post-store';

	postList.set($page.data.posts);
</script>

<div class="card-filler">
	{#if $loading}
		<Loader />
	{:else}
		<PostList total={$page.data.total} filter={$page.data.tag} type="tag" />
	{/if}
</div>
