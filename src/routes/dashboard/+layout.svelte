<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';

	// navbars
	showRight.set(true);
	showLeft.set(true);
	breadcrumbs.resetBC();
	breadcrumbs.addBC('Dashboard');
</script>

<slot />
