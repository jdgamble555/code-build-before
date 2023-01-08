<script lang="ts">
	import { page } from '$app/stores';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { MetaTags } from 'svelte-meta-tags';

	breadcrumbs.resetBC();
	breadcrumbs.addBC($page.data.post.title);
</script>

<MetaTags noindex nofollow />

<slot />
