<script lang="ts">
	import type { Post, Tag } from '$lib/post.model';
	import Card, { Content } from '@smui/card';
	import Time from 'svelte-time';
	import { Icon } from '@smui/button';
	import { goto } from '$app/navigation';
	import Chip, { Set, Text } from '@smui/chips';

	export let post: Post;
</script>

<Card variant="outlined" padded>
	{#if post.image}
		<img class="image" src={post.image} alt={post.title} width="1250" height="650" />
	{/if}
	<Content>
		<a href={'/p/' + post.id + post.slug}>
			<h2 class="ng-link">
				<span class="blue material-icons card-icon">library_books</span>
				{post.title}
			</h2>
		</a>

		<h6><i>{post.minutes} min read</i></h6>
		<a href={'/u' + post.author.id + post.author.username}>
			<div class="ng-author ng-link">
				{#if post.author?.photoURL}
					<img
						class="avatar"
						width="2.5em"
						height="2.5em"
						src={post.author.photoURL}
						alt={post.author.displayName}
					/>
				{:else}
					<Icon class="material-icons">link</Icon>
				{/if}

				<p>
					<small>
						<b>{post.author.username}</b>
						{#if post.publishedAt}
							on <Time timestamp={post.publishedAt} format="dddd, MMMM D, YYYY" />
						{/if}
						{#if post.updatedAt}
							(last modified on <Time timestamp={post.updatedAt} format="dddd, MMMM D, YYYY" />)
						{/if}
					</small>
				</p>
			</div>
		</a>
		{#if post.tags}
			<div class="grey-tag">
				<Set chips={post.tags} let:chip>
					<Chip {chip} on:click={() => goto('/t/' + chip)}>
						<Text>{chip}</Text>
					</Chip>
				</Set>
			</div>
		{/if}
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
	.avatar {
		width: 2.5em !important;
		height: 2.5em !important;
		border-radius: 50% !important;
	}
	.card-icon {
		padding-right: 10px;
		vertical-align: middle;
		padding-bottom: 5px;
	}
	.ng-author {
		display: flex;
		align-items: center;
	}
	.ng-author img {
		margin-right: 10px;
	}
</style>
