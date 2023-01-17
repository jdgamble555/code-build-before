<script lang="ts">
	import { page } from '$app/stores';
	import PostDetail from '@components/post/post-detail.svelte';
</script>

{#key $page}
	<PostDetail post={$page.data.post} details />
{/key}
