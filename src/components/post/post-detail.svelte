<script lang="ts">
	import type { Post } from '$lib/post.model';
	import Card, { Content, Media, MediaContent } from '@smui/card';

	export let post: Post;
</script>

<Card variant="outlined" padded>
	{#if post.image}
		<img class="image" src={post.image} alt={post.title} width="1250" height="650" />
	{/if}

	<Content class="centered">
		<h2>{post.title}</h2>
	</Content>
</Card>
<br />

<style>
	.image {
		width: calc(100% + 32px);
		margin: -16px -16px 0 -16px;
		display: block;
		overflow: hidden;
		height: auto;
	}
</style>