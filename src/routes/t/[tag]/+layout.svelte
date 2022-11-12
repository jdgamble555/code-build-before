<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';

	import type { PageData } from './$types';

	export let data: PageData;

	breadcrumbs().addBC(data.tag);
</script>

<slot />
