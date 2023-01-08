<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';
	import { settings } from '$lib/settings';

	// navbars
	showRight.set(true);
	showLeft.set(true);
	breadcrumbs.resetBC();

	const meta = {
		description: settings.meta_description,
		title: settings.meta_title,
		username: settings.meta_author,
		url: settings.domain,
		image: settings.meta_image
	};
</script>

<MetaTags
	title={meta.title}
	description={meta.description}
	openGraph={{
		url: meta.url,
		title: meta.title,
		type: 'website',
		description: meta.description,
		images: [
			{
				url: meta.image,
				width: 770,
				height: 350,
				alt: meta.title
			}
		],
		site_name: settings.meta_title
	}}
	twitter={{
		site: '@code.build',
		cardType: 'summary_large_image',
		title: meta.title,
		description: meta.description,
		image: meta.image,
		imageAlt: meta.title,
		handle: settings.meta_author
	}}
/>

<slot />
