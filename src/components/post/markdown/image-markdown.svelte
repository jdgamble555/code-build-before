<script lang="ts">
	export let href = '';
	export let title: string | undefined = undefined;
	export let text = '';
</script>

<img src={href} {title} alt={text} />

<style>
	img {
		max-width: 100%;
	}
</style>
