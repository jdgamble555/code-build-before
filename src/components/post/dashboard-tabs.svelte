<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import PostList from './post-list.svelte';
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';
	import { postList } from '$lib/post-store';
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
			postList.set(p.data ?? []);
			total = p.count || 0;
			loading.set(false);
		});
	};

	onMount(loadPosts);

	let active = 'Bookmarks';

	const types =
		user.role !== 'ADMIN' ? ['Bookmarks'] : ['Bookmarks', 'Posts', 'Drafts', 'Unpublished'];
</script>

<div class="card-filler">
	<TabBar tabs={types} let:tab bind:active on:click={loadPosts}>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#if $loading}
		<Loader />
	{:else}
		<PostList {total} type={_types[active]} filter={user.id} drafts={active === 'Drafts'} />
	{/if}
</div>
