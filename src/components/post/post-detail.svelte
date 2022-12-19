<script lang="ts">
	import Save from './actions/save.svelte';
	import type { Post } from '$lib/post.model';
	import Card, { Content } from '@smui/card';
	import Time from 'svelte-time';
	import IconButton, { Icon } from '@smui/icon-button';
	import { goto } from '$app/navigation';
	import Chip, { Set, Text } from '@smui/chips';
	import PostMarkdown from './post-markdown.svelte';
	import Like from '@components/post/actions/like.svelte';
	import { Separator } from '@smui/list';
	import Actions from '@smui/card/src/Actions.svelte';
	import { auth } from '$lib/database';
	import { postDetail } from '$lib/post-store';

	const { user } = auth;

	export let post: Post;
	export let details = false;

	const navigate = (edit = false) => {
		// navigate to edit or form page
		// preload post to prevent over-fetching
		postDetail.set(post);
		const route = edit ? '/edit/' + post.id : '/p/' + post.id + '/' + post.slug;
		goto(route);
	};
</script>

<svelte:head />
<div class="post">
	<Card variant="outlined" padded>
		{#if post.image}
			<img class="image" src={post.image} alt={post.title} width="1250" height="650" />
		{/if}
		<Content>
			<div on:click={() => navigate()} on:keypress={() => navigate()}>
				<h2 class="ng-link">
					<span class="blue material-icons card-icon">library_books</span>
					{post.title}
				</h2>
			</div>

			<h6><i>{post.minutes} min read</i></h6>
			<a href={'/u/' + post.author.id + '/' + post.author.username}>
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
			{#if details}
				<PostMarkdown source={post.content} />
			{/if}
			{#if post.tags}
				<div class="grey-tag tag-set">
					<Set chips={post.tags} let:chip>
						<Chip {chip} on:click={() => goto('/t/' + chip)}>
							<Text>{chip}</Text>
						</Chip>
					</Set>
				</div>
			{/if}
			<br />
		</Content>
		<Separator />
		<Actions class="flex-container">
			{#if $user && $user !== 'loading'}
				<div>
					<Save postId={post.id} userId={$user.id} />
					<Like count={post.heartsCount} postId={post.id} userId={$user.id} />
				</div>
				{#if post.author.id === $user.id}
					<IconButton class="material-icons" on:click={() => navigate(true)} title="Edit">
						edit
					</IconButton>
				{/if}
			{:else}
				<Save postId={post.id} />
				<Like count={post.heartsCount} postId={post.id} />
			{/if}
		</Actions>
	</Card>
</div>
<br />

<style>
	.tag-set {
		margin-top: 20px;
		margin-left: -20px;
		margin-bottom: -20px;
	}
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
