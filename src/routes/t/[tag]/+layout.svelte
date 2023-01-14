<script lang="ts">
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { settings } from '$lib/settings';
	import { MetaTags } from 'svelte-meta-tags';
	import Schema from '$lib/schema.svelte';
	import { marked } from 'marked';

	import type { LayoutData } from './$types';
	import type { Post } from '$lib/post.model';
	export let data: LayoutData;

	$: {
		breadcrumbs.resetBC();
		breadcrumbs.addBC(data.tag as string);
	}

	const meta = {
		description: data.tag + ' content at ' + settings.meta_title,
		title: data.tag + ' - ' + settings.meta_title,
		username: settings.meta_author,
		url: settings.domain,
		image: settings.meta_image
	};

	const schema = [
		{
			'@type': 'ItemList',
			'@identifier': settings.domain + '/t/' + data.tag,
			'name': meta.title,
			'numberOfItems': data.posts?.length,
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

<Schema {schema} />

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
