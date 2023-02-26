<script lang="ts">
	import type { Post } from '$lib/post.model';
	import Button, { Icon } from '@smui/button';
	import List, { Item } from '@smui/list';
	import Menu from '@smui/menu';
	import { copy } from 'svelte-copy';
	import { get } from 'svelte/store';

	import { page } from '$app/stores';
	import { showMsg } from '$lib/stores';
	let menu: Menu;

	const url = get(page).url.origin + get(page).url.pathname;

	export let post: Post;

	export let share = encodeURI(
		post.title + ' By ' + post.author.displayName + ' Code.Build ' + url
	);
</script>

<Button on:click={() => menu.setOpen(true)}>
	<Icon class="material-icons">more_vert</Icon>
</Button>
<Menu bind:this={menu}>
	<List>
		<button
			use:copy={url}
			on:svelte-copy={() => {
				showMsg('Link Copied!');
				menu.setOpen(false);
			}}
			><Item>Copy URL</Item>
		</button>
		<button
			on:click={() => {
				window.open('https://twitter.com/intent/tweet?text=' + share, '_blank');
				menu.setOpen(false);
			}}
			><Item>Share to Twitter</Item>
		</button>
		<button
			on:click={() => {
				window.open('https://www.facebook.com/sharer.php?u=' + url, '_blank');
				menu.setOpen(false);
			}}
			><Item>Share to Facebook</Item>
		</button>
		<button
			on:click={() => {
				window.open('https://www.reddit.com/submit?url=' + url, '_blank');
				menu.setOpen(false);
			}}
			><Item>Share to Reddit</Item>
		</button>
	</List>
</Menu>

<style>
	button {
		all: unset;
		cursor: pointer;
		width: 100%;
	}
</style>
