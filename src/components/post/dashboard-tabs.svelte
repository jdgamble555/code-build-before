<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import PostList from './post-list.svelte';
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';
	import { posts } from '$lib/post-store';
	import { read_post } from '$lib/database';
	import type { types } from '$lib/post.model';
	import { onMount } from 'svelte';
	import type { UserRec } from '$lib/user.model';

	export let user: UserRec;

	const { getPosts } = read_post;

	let total = 0;

	const _types: { [key: string]: types } = {
		Bookmarks: 'bookmarks',
		Posts: 'author',
		Drafts: 'drafts',
		Unpublished: 'unpublished'
	};

	const loadPosts = () => {
		loading.set(true);
		getPosts({ type: _types[active], filter: user.id }).then((p) => {
			posts.set(p.data ?? []);
			total = p.count || 0;
			loading.set(false);
		});
	};

	onMount(loadPosts);

	let active = 'Bookmarks';
</script>

<div class="card-filler">
	<TabBar
		tabs={['Bookmarks', 'Posts', 'Drafts', 'Unpublished']}
		let:tab
		bind:active
		on:click={loadPosts}
	>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#if $loading}
		<Loader />
	{:else}
		<PostList {total} />
	{/if}
</div>
