<script lang="ts">
	import Confirm from '@components/dialog/confirm.svelte';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	showRight.set(false);
	showLeft.set(false);

	$: {
		breadcrumbs.resetBC();
		breadcrumbs.addBC('Edit Post');
		breadcrumbs.addBC(data.post ? data.post.id : '');
	}
</script>

<Confirm />
<slot />
