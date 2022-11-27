<script lang="ts">
	import type { sortFields } from '$lib/post.model';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import PostList from './post-list.svelte';
	import { loading } from '$lib/stores';
	import Loader from '@components/nav/loader.svelte';
	import { page } from '$app/stores';
	import { getPosts, posts } from '$lib/post-store';

	posts.set($page.data.posts);

	const _types: { [key: string]: sortFields } = {
		New: 'createdAt',
		Updated: 'updatedAt',
		Top: 'heartsCount'
	};

	let active = 'New';
</script>

<div class="card-filler">
	<TabBar
		tabs={['New', 'Updated', 'Top']}
		let:tab
		bind:active
		on:click={() => {
			getPosts({ sortField: _types[active] });
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

