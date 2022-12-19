<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	$: {
		breadcrumbs.resetBC();
		breadcrumbs.addBC('Edit Post');
        breadcrumbs.addBC(data.post.id);
	}
</script>

<slot />
