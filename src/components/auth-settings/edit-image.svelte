<script lang="ts">
	import { auth_settings, image_upload } from '$lib/database';
	import { showMsg } from '$lib/stores';
	import Button, { Icon, Label } from '@smui/button';

	export let photoURL: string;
	export let displayName: string;

	let fileInput: HTMLInputElement;

	const { deleteImage, uploadImage } = image_upload;
	const { updateProfile } = auth_settings;

    const uploadFile = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.item(0);
        console.log(file);

    };
</script>

<div class="image-box">
	{#if photoURL}
		<img src={photoURL} alt={displayName} width="180px" />
		<br />
		<Button
			variant="outlined"
			color="primary"
			class="item-space"
			aria-label="Delete Image"
			title="Delete Image"
			on:click={() => {
				updateProfile({ photoURL: null });
				deleteImage(photoURL);
				photoURL = '';
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
