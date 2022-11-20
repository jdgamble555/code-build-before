<script lang="ts">
	import PostTag from '@components/post/post-tag.svelte';
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { loading } from '$lib/stores';

	beforeNavigate((nav) => {
		if (nav.to?.route.id?.startsWith('/t/')) {
			loading.set(true);
		}
	});
	afterNavigate(() => loading.set(false));
</script>

{#key $page}
	<PostTag posts={$page.data.posts} tag={$page.data.tag} />
{/key}
