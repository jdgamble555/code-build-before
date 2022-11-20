<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';

	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: {
		breadcrumbs().addBC(data.tag as string);
	}
</script>

<div>
	ID: {data.random}
</div>

<slot />
