<script lang="ts">
	import { actions } from '$lib/database';
	import { goto } from '$app/navigation';
	import Button, { Icon } from '@smui/button';
	import { Label } from '@smui/list';
	import { onMount } from 'svelte';

	export let saved = false;
	export let postId: string;
	export let userId: string | null = null;

	const { getActionExists, actionPost, unActionPost } = actions;

	// get state of action in db
	// todo: move to post detail, get all posts saved status at once

	onMount(async () => {
		if (userId) {
			const { data, error } = await getActionExists(postId, userId, 'bookmarks');
			if (error) {
				console.error(error);
			} else {
				if (data) {
					saved = data;
				}
			}
		}
	});

	const save = async () => {
		if (userId) {
			// update status optimistically
			saved = !saved;
			const { error } = saved
				? await actionPost(postId, userId, 'bookmarks')
				: await unActionPost(postId, userId, 'bookmarks');
			if (error) {
				saved = !saved;
				console.error(error);
			}
		} else {
			goto('/login');
		}
	};
</script>

<Button on:click={save}>
	<Icon class="material-icons blue">{saved ? 'bookmark' : 'bookmark_border'}</Icon>
	<Label class="no-bold">Save</Label>
</Button>
