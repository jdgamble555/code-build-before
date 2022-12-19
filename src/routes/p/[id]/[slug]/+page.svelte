<script lang="ts">
	import PostDetail from '@components/post/post-detail.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

{#if data.post}
	<PostDetail post={data.post} details />
{/if}
