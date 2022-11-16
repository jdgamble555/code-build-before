<script lang="ts">
	import type { LayoutData } from './$types';
	import Home from '@components/home.svelte';
	import { setContext } from 'svelte';

	export let data: LayoutData;

	setContext('posts', data.posts);
</script>

<Home/>
