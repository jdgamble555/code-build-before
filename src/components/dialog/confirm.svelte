<script lang="ts">
	import { dialogStore } from '$lib/stores';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import { edit_post, image_upload } from '$lib/database';
	import { goto } from '$app/navigation';

	const { deletePost } = edit_post;
	const { deleteImage } = image_upload;

	async function _delete() {

		// todo - cover deleting published vs drafts
		
		// delete cover image
		if ($dialogStore.imageURL) {
			const { error } = await deleteImage($dialogStore.imageURL);
			if (error) {
				console.error(error);
			}
		}

		// delete uploaded images
		const files = $dialogStore.imageUploads;

		if (Array.isArray(files) && files.length > 0) {
			for (const f of files) {
				const { error } = await deleteImage(f);
				if (error) {
					console.error(error);
				}
			}
		}

		// delete post
		if ($dialogStore.id) {
			const { error } = await deletePost($dialogStore.id);
			if (error) {
				console.error(error);
			}

			// go home
			goto('/');
		}
	}
</script>

<Dialog
	bind:open={$dialogStore.show}
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
>
	<Title id="simple-title">Delete Post</Title>
	<Content id="simple-content">Are you sure you want to delete this post?</Content>
	<Actions>
		<Button on:click={() => dialogStore.reject()}>
			<Label>No</Label>
		</Button>
		<Button on:click={_delete}>
			<Label>Yes</Label>
		</Button>
	</Actions>
</Dialog>
