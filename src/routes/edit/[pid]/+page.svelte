<script lang="ts">
	import { browser } from '$app/environment';
	import PostForm from '@components/post/post-form.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

{#if browser && data.post}
	<PostForm post={data.post} />
{/if}
