<script lang="ts">
	import Button, { Label } from '@smui/button';

	export let image: string | undefined = undefined;

	let files: FileList;
	let file: HTMLElement;
</script>

<Button class="no-bold" on:click={() => file.click()} variant="outlined">
	<Label>{image ? 'Change' : 'Upload'} Cover Image</Label>
</Button>
<input hidden type="file" accept="image/*" bind:files bind:this={file} />
