<script lang="ts">
	import Schema from '$lib/schema.svelte';
	import { page } from '$app/stores';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import type { Post } from '$lib/post.model';
	import { settings } from '$lib/settings';
	import { MetaTags } from 'svelte-meta-tags';
	import { marked } from 'marked';

	const post = $page.data.post as Post;

	breadcrumbs.resetBC();
	breadcrumbs.addBC(post.title);

	const meta = {
		pid: post.id,
		description: marked.parse(post.content.substring(0, 125)),
		content: marked.parse(post.content),
		title: post.title + ' - ' + settings.meta_title,
		headline: post.title,
		username: post.author.username as string,
		url: settings.domain,
		image: post.image as string,
		published: new Date(post.publishedAt).toISOString(),
		updated: new Date(post.updatedAt ?? post.createdAt).toISOString(),
		created: new Date(post.createdAt).toISOString(),
		tags: post.tags,
		uid: post.author.id,
		author_url: settings.domain + '/u/' + post.author.id + '/' + post.author.username,
		tags_string: post.tags.join(', '),
		minutes: post.minutes,
		post_url: settings.domain + '/p/' + post.id + '/' + post.slug
	};

	const schema = [
		{
			'@type': 'BlogPosting',
			headline: meta.headline,
			name: meta.title,
			author: {
				'@type': 'Person',
				name: settings.meta_author,
				url: meta.author_url,
				alternateName: meta.username,
				identifier: meta.uid
			},
			datePublished: meta.published,
			dateModified: meta.updated,
			dateCreated: meta.created,
			articleBody: meta.content,
			description: meta.description,
			image: meta.image,
			keywords: meta.tags_string,
			timeRequired: post.minutes + 'M',
			identifier: meta.pid,
			url: meta.post_url,
			publisher: {
				'@type': 'Organization',
				name: settings.meta_title
			}
		},
		{
			'@type': 'BreadcrumbList',
			'name': meta.title,
			'numberOfItems': 1,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: meta.headline,
					url: meta.post_url,
					image: meta.image,
					id: meta.pid,
					description: meta.description
				}
			]
		}
	];
</script>

<Schema {schema} />

<MetaTags
	title={meta.title}
	description={meta.description}
	openGraph={{
		url: meta.url,
		title: meta.headline,
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
			publishedTime: meta.published,
			modifiedTime: meta.updated,
			authors: ['https://code.build/u/' + meta.uid + '/' + meta.username],
			tags: meta.tags
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
