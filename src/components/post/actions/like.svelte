<script lang="ts">
	import { goto } from '$app/navigation';
	import { actions } from '$lib/database';
	import Button from '@smui/button';
	import { Label } from '@smui/list';
	import { Icon } from '@smui/tab';
	import { onMount } from 'svelte';

	export let count = 0;
	export let liked = false;
	export let postId: string;
	export let userId: string | null = null;

	const { getActionExists, actionPost, unActionPost } = actions;

	// get state of action in db
	// todo: move to post detail, get all posts liked status at once

	onMount(async () => {
		if (userId) {
			const { data, error } = await getActionExists(postId, userId, 'hearts');
			if (error) {
				console.error(error);
			} else {
				if (data) {
					liked = data;
				}
			}
		}
	});

	const like = async () => {
		if (userId) {
			// update status optimistically
			liked ? count-- : count++;
			liked = !liked;
			const { error } = liked
				? await actionPost(postId, userId, 'hearts')
				: await unActionPost(postId, userId, 'hearts');
			if (error) {
				liked ? count-- : count++;
				liked = !liked;
				console.error(error);
			}
		} else {
			goto('/login');
		}
	};
</script>

<Button on:click={like}>
	<Icon class="material-icons red">{count > 0 ? 'favorite' : 'favorite_border'}</Icon>
	<Label class="no-bold">{count} like{count === 1 ? '' : 's'}</Label>
</Button>
