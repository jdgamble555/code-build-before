<script lang="ts">
	import CircularProgress from '@smui/circular-progress';
	import { auth, image_upload } from '$lib/database';
	import { imageUploads } from '$lib/stores';

	const { user } = auth;
	const { uploadImage } = image_upload;

	let loadingImage = false;

	let files: FileList;
	let file: HTMLElement;

	function addImageLink(url: string) {
		const value = `![Image Description](${url})`;
		const currentInput = document.getElementById('controlId') as HTMLTextAreaElement;
		if (currentInput) {
			let cursorPos = currentInput.selectionStart;
			let v = currentInput.value;
			let textBefore = v.substring(0, cursorPos);
			let textAfter = v.substring(cursorPos, v.length);
			currentInput.value = textBefore + value + textAfter;

			cursorPos += value.length;
			currentInput.focus();
			currentInput.setSelectionRange(cursorPos, cursorPos);
		}
	}

	async function addImage(e: Event) {
		// add event to image service
		const target = e.target as HTMLInputElement;

		if (target.files?.length) {
			loadingImage = true;

			// view file before upload
			const file = target.files[0];

			const uid = $user.data && !$user.loading ? $user.data.id : null;
			if (uid) {
				const { url, error } = await uploadImage(`post-images/${uid}`, file);
				loadingImage = false;
				if (error) {
					console.error(error);
				}
				if (url) {
                    // add image urls
					addImageLink(url);
                    $imageUploads = [...$imageUploads, url];
				}
			}
		}
	}
</script>

<md-image-upload
	title="Image"
	aria-label="Image"
	on:click={() => file.click()}
	on:keypress={addImage}
>
	<input hidden type="file" accept="image/*" bind:files bind:this={file} on:change={addImage} />
	<button class="btn">
		{#if loadingImage}
			<CircularProgress style="height: 16px; width: 16px;" indeterminate />
		{:else}
			<svg
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				class="bi bi-card-image"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
				/>
			</svg>
		{/if}
	</button>
</md-image-upload>

<style>
	.btn {
		background: none;
		border: none;
		cursor: pointer;
		display: inline-block;
		height: 24px;
		padding: 3px 5px;
		width: 28px;
		color: #222;
	}
</style>
