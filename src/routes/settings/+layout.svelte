<script lang="ts">
	import { showLeft, showRight } from '$lib/stores';

	// navbars
	showRight.set(false);
	showLeft.set(false);
</script>

<slot />