<script lang="ts">
	export let href = '';
	export let title: string | undefined = undefined;
	export let text = '';
</script>

<a {href} {title}>{text}</a>

<style>
	a:hover {
		text-decoration: underline;
	}
</style>
