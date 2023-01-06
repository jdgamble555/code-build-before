<script lang="ts">
	import type { Optional } from '$lib/user.model';
	import Button, { Label } from '@smui/button';

	export let image: Optional<string> = undefined;
	export let title: Optional<string> = undefined;

	let files: FileList;
	let file: HTMLElement;
</script>

<Button class="no-bold" on:click={() => file.click()} variant="outlined">
	<Label>{image ? 'Change' : 'Upload'} Cover Image</Label>
</Button>
<input hidden type="file" accept="image/*" bind:files bind:this={file} />

{#if image}
	<div class="image-container">
		<img src={image} alt={title} />
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
