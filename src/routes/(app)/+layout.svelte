<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';

	// navbars
	showRight.set(true);
	showLeft.set(true);
	const crumbs = breadcrumbs();
	crumbs.resetBC();
</script>

<slot />
