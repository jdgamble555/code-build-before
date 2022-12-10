<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';

	// navbars
	showRight.set(true);
	showLeft.set(true);
	breadcrumbs().addBC('Dashboard');
</script>

<slot />
