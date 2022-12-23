<script lang="ts">
	import PostDetail from '@components/post/post-detail.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.post}
	<PostDetail post={data.post} details />
{/if}
