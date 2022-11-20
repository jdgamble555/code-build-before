<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	$: {
		breadcrumbs().addBC(data.tag as string);
	}
</script>

<slot />
