<script lang="ts">
	import { page } from '$app/stores';
	import { breadcrumbs } from '$lib/breadcrumbs';

	breadcrumbs.resetBC();
	breadcrumbs.addBC($page.data.post.title);
</script>

<slot />
