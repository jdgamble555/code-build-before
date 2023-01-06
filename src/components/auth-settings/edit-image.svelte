<script lang="ts">
	import { auth_settings, image_upload } from '$lib/database';
	import { blobToFile } from '$lib/image-tools';
	import { showMsg } from '$lib/stores';
	import Button, { Icon, Label } from '@smui/button';
	import { decode } from 'j-supabase';

	export let user: any;

	let fileInput: HTMLInputElement;

	const { deleteImage, uploadImage } = image_upload;
	const { updateProfile } = auth_settings;

	const uploadFile = async (e: Event) => {
		const file = (e.target as HTMLInputElement).files?.item(0);
		if (file) {
			// convert to png
			const image = blobToFile(file, file?.name);
			const { url, error } = await uploadImage('profile_images', image, decode(user.id));
			if (error) {
				console.error(error);
				showMsg(error);
			} else {
				user.photoURL = url;
				const { error } = await updateProfile({ photoURL: url });
				if (error) {
					console.error(error);
				}
			}
		}
	};
</script>

<div class="image-box">
	{#if user.photoURL}
		<img src={user.photoURL} alt={user.displayName} width="180px" />
		<br />
		<Button
			color="primary"
			class="item-space"
			aria-label="Delete Image"
			title="Delete Image"
			on:click={() => {
				updateProfile({ photoURL: null });
				deleteImage(user.photoURL);
				user.photoURL = '';
				showMsg('Image Deleted!');
			}}
		>
			<Icon class="material-icons">delete</Icon>
			<Label><span class="no-bold">Delete</span></Label>
		</Button>
	{:else}
		<Icon class="material-icons account-icon">account_circle</Icon>
		<br />
		<input hidden type="file" accept="image/*" bind:this={fileInput} on:change={uploadFile} />
		<Button
			variant="outlined"
			color="primary"
			type="file"
			class="item-space"
			aria-label="Upload Image"
			title="Upload Image"
			on:click={async () => fileInput.click()}
		>
			<Icon class="material-icons">upload</Icon>
			<Label><span class="no-bold">Upload</span></Label>
		</Button>
	{/if}
</div>

<style global>
	.image-box {
		margin-bottom: 20px;
	}
	.account-icon {
		transform: scale(4);
		margin-left: 30px;
		margin-top: 30px;
		margin-bottom: 40px;
	}
</style>
