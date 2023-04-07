<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let value: string = new Date().toISOString();
	let tmpDate = writable(dateForDateTimeInputValue(new Date(value)));
	let unsubscribe = () => {};

	onMount(() => {
		unsubscribe = tmpDate.subscribe(() => {
			value = $tmpDate ? new Date($tmpDate).toISOString() : '';
		});
	});

	onDestroy(unsubscribe);

	function dateForDateTimeInputValue(date: Date) {
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		return date.toISOString().slice(0, 16);
	}

	function showDate(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target?.nodeName === 'INPUT') {
			target.showPicker();
		}
	}
</script>

<Textfield
	on:click={showDate}
	type="datetime-local"
	class="text-size"
	variant="outlined"
	bind:value={$tmpDate}
	label="Publish Date"
	required
>
	<Icon class="material-icons" slot="leadingIcon">event</Icon>
</Textfield>
