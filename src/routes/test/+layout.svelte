<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';

	showRight.set(false);
	showLeft.set(false);

	$: {
		breadcrumbs.resetBC();
		breadcrumbs.addBC('Test');
	}
</script>

<slot />
