<script lang="ts">
	import { page } from '$app/stores';

	let gtag: any;

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-YNY2E6SGS2', {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-YNY2E6SGS2">
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'G-YNY2E6SGS2');
	</script>
</svelte:head>
