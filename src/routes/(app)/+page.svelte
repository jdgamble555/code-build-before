<script lang="ts">
	import type { LayoutData } from './$types';
	import Home from '@components/home.svelte';

	export let data: LayoutData;
</script>

<Home posts={data.posts} />
