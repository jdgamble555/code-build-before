<script lang="ts">
	import { image_upload } from '$lib/database';
	import { blobToData, blobToFile, getPreviewImage } from '$lib/image-tools';
	import type { Optional } from '$lib/user.model';
	import Button, { Label } from '@smui/button';
	import type { field } from 'svelte-forms';

	const { deleteImage } = image_upload;

	function removeCoverImage () {
		if ($image.value) {
			deleteImage($image.value);
			image.set('');
		}
	}

	type fieldType<T> = ReturnType<typeof field<T>>;

	export let image: fieldType<Optional<string>>;
	export let title: Optional<string> = undefined;

	export let imageFile: Optional<File> = undefined;

	let files: FileList;
	let file: HTMLElement;

	// refresh form when image changes
	// upload image on auto-save
	//
	// on image preview change
	// - replace viewable image
	// on auto-save with image preview
	// - delete any tmp images, but not published image
	// - upload new image
	// on publish
	// - delete old image
	// - replace url with new image

	// variables
	// - image - current image url (if draft, draft, otherwise published)
	// - newImage - unsaved image url
	// - pubImage - published image url
	// - unsaved image

	// situation 1 - save-draft, no image change
	// if

	// create id on client with new
	// upload image, save to drafts/cover-image
	// if change drafts/cover-image, delete old one first
	// if publish,

	async function updateImage(e: Event) {
		const { blob, filename } = await getPreviewImage(document, e);
		if (blob && filename) {
			const _image = await blobToData(blob);
			image.set(_image);
			imageFile = blobToFile(blob, filename);
		}
	}
</script>

<Button class="no-bold" on:click={() => file.click()} variant="outlined">
	<Label>{$image.value ? 'Change' : 'Upload'} Cover Image</Label>
</Button>
<input hidden type="file" accept="image/*" bind:files bind:this={file} on:change={updateImage} />
{#if $image.value}
	<span class="horizontal-space" />
	<Button
		class="no-bold"
		on:click={removeCoverImage}
		variant="outlined"
	>
		<Label>Delete Cover Image</Label>
	</Button>
	<div class="image-container">
		<img src={$image.value} alt={title} />
	</div>
{/if}

<style>
	.image-container {
		margin: 20px 0;
		width: 100%;
		height: 100%;
	}
	.image-container img {
		max-width: 100%;
		max-height: 100%;
		margin: auto;
		display: block;
	}
</style>
