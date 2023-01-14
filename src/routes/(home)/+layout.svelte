<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { showLeft, showRight } from '$lib/stores';
	import { settings } from '$lib/settings';
	import Schema from '$lib/schema.svelte';
	import { marked } from 'marked';

	import type { LayoutData } from './$types';
	import type { Post } from '$lib/post.model';
	import { browser } from '$app/environment';
	export let data: LayoutData;

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

	const schema = [
		{
			'@type': 'ItemList',
			itemListElement: data.posts?.map((r: Post, i: number) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: r.title,
				url: settings.domain + '/p/' + r.id + '/' + r.slug,
				image: r.image,
				description: marked.parse(r.content.substring(0, 125)),
				id: r.id
			}))
		}
	];
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Code.Build 💻 RSS Feed"
		href="https://code.build/feed"
	/>
</svelte:head>

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

{#if !browser}
	<Schema {schema} />
{/if}

<slot />
