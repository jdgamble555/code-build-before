<script lang="ts">
	import { showLeft, showRight } from '$lib/stores';

	// navbars
	showRight.set(true);
	showLeft.set(true);
</script>

<slot />
