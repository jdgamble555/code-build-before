<script lang="ts">
	import PostForm from '@components/post/post-form.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<PostForm post={data.post} />
