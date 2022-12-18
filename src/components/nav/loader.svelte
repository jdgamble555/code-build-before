<script lang="ts">
	import CircularProgress from '@smui/circular-progress';

	export let size: number = 50;
	export let white: boolean = false;
</script>

<center>
	<CircularProgress
		class={white ? 'white-circle' : ''}
		style="height: {size}px; width: {size}px;"
		indeterminate
	/>
</center>

<style lang="scss" global>
	@import './loader.scss';
</style>
