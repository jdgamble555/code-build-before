<script lang="ts">
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<MetaTags noindex nofollow />
