<script lang="ts">
	import PostTag from '@components/post/post-tag.svelte';
	import { page } from '$app/stores';
</script>

{#key $page}
	<PostTag posts={$page.data.posts} tag={$page.data.tag} />
{/key}
 