<script lang="ts">
	import { page } from '$app/stores';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import { settings } from '$lib/settings';
	import { MetaTags } from 'svelte-meta-tags';
	//import type { PageData } from './$types';

	//let data = $page.data as PageData;

	breadcrumbs.resetBC();
	breadcrumbs.addBC($page.data.post.title);

	const meta = {
		description: $page.data.post.description,
		title: $page.data.post.title + ' - ' + settings.meta_title,
		username: $page.data.post.author.username,
		url: settings.domain,
		image: $page.data.post.image,
		article: {
			published: $page.data.post.publishedAt,
			updated: $page.data.post.updatedAt,
			tags: $page.data.post.tags,
			uid: $page.data.post.author.id
		}
	};
</script>

<MetaTags
	title={meta.title}
	description={meta.description}
	openGraph={{
		url: meta.url,
		title: meta.title,
		type: 'article',
		description: meta.description,
		images: [
			{
				url: meta.image,
				width: 1250,
				height: 650,
				alt: meta.title
			}
		],
		site_name: settings.meta_title,
		article: {
			publishedTime: meta.article.published,
			modifiedTime: meta.article.updated,
			authors: ['https://code.build/u/' + meta.article.uid + '/' + meta.username],
			tags: meta.article.tags
		}
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
