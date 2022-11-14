<script lang="ts">
	import Card, { Content } from '@smui/card';
	import { settings } from '$lib/settings';
	import PostList from './post/post-list.svelte';
	import type { Optional, Post } from '$lib/post.model';

	export let posts: Optional<Post[]>;
</script>

<svelte:head>
	<title>{settings.sitename}</title>
</svelte:head>

<Card variant="outlined" padded>
	<Content class="centered">
		<h1 class="title-home">{settings.sitename}</h1>

		An easier way to code your web applications !
	</Content>
</Card>
<PostList {posts} />

<style>
	.title-home {
		font-size: 2.5rem !important;
	}	
</style>
