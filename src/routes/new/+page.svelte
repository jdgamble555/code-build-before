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
		$user.data && !$user.loading
			? {
					id: '0x0',
					title: '',
					content: '',
					slug: '',
					minutes: '',
					author: {
						id: $user.data.id,
						email: $user.data.email,
						role: $user.data.role,
						createdAt: $user.data.createdAt,
						providers: $user.data.providers,
						username: $user.data.username,
						photoURL: $user.data.photoURL
					},
					createdAt: new Date(),
					publishedAt: new Date(),
					heartsCount: 0,
					tags: []
			  }
			: undefined;
</script>

{#if $user.loading}
	<div class="centered">
		<Loader />
	</div>
{:else if $user.data}
	{#if post}
		<PostForm {post} />
	{/if}
{:else if browser}
	{goto('/login')}
{/if}
