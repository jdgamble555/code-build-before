<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	$: {
		breadcrumbs.resetBC();
		breadcrumbs.addBC(data.username as string);
	}
</script>

<slot />