<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import PostList from './post-list.svelte';
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';
	import { page } from '$app/stores';
	import { posts } from '$lib/post-store';
	import { read_post } from '$lib/database';
	import type { types } from '$lib/post.model';

	const { getPosts } = read_post;

	posts.set($page.data.posts);

	const _types: { [key: string]: types } = {
		New: 'latest',
		Updated: 'updated',
		Top: 'likes'
	};

	let active = 'New';
</script>

<div class="card-filler">
	<TabBar
		tabs={['New', 'Updated', 'Top']}
		let:tab
		bind:active
		on:click={() => {
			loading.set(true);
			getPosts({ type: _types[active] }).then((p) => {
				posts.set(p.data ?? []);
				loading.set(false);
			});
		}}
	>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	{#if $loading}
		<Loader />
	{:else}
		<PostList total={$page.data.total} type={_types[active]} />
	{/if}
</div>
