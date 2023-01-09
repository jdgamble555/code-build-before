<script lang="ts">
	import Confirm from '@components/dialog/confirm.svelte';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';

	showRight.set(false);
	showLeft.set(false);

	$: {
		breadcrumbs.resetBC();
		breadcrumbs.addBC('New Post');
	}
</script>

<Confirm />
<slot />
