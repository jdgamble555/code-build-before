<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/database';
	import type { Optional, Post } from '$lib/post.model';
	import Loader from '@components/nav/loader.svelte';
	import PostForm from '@components/post/post-form.svelte';

	let post: Optional<Post>;

	const { user } = auth;

	$: post =
		$user && $user !== 'loading'
			? {
					id: '0x0',
					title: '',
					content: '',
					slug: '',
					minutes: '',
					author: {
						id: $user.id,
						email: $user.email,
						role: $user.role,
						createdAt: $user.createdAt,
						providers: $user.providers,
						username: $user.username,
						photoURL: $user.photoURL
					},
					createdAt: new Date(),
					publishedAt: new Date(),
					heartsCount: 0,
					tags: []
			  }
			: undefined;
</script>

{#if browser}
	{#if $user === 'loading'}
		<div class="centered">
			<Loader />
		</div>
	{:else if $user}
		{#if post}
			<PostForm {post} />
		{/if}
	{:else}
		{goto('/login')}
	{/if}
{/if}
