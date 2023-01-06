<script lang="ts">
	//import Flatpickr from 'svelte-flatpickr';
	//import type { BaseOptions } from 'flatpickr/dist/types/options';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	/*export let options: Partial<BaseOptions> = {
		enableTime: true,
		position: 'above'
	};
	let el: HTMLElement;*/

	export let value: string;
	let tmpDate = writable(dateForDateTimeInputValue(new Date(value) || new Date()));
	let unsubscribe = () => {};

	onMount(() => {
		unsubscribe = tmpDate.subscribe(() => {
			value = $tmpDate ? new Date($tmpDate).toISOString() : '';
		});
	});

	onDestroy(unsubscribe);

	function dateForDateTimeInputValue(date: Date) {
		return new Date(date.getTime() + date.getTimezoneOffset() * -60 * 1000)
			.toISOString()
			.slice(0, 19);
	}

	function showDate(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target?.nodeName === 'INPUT') {
			target.showPicker();
		}
	}

	//$: el ? new MDCTextField(el) : undefined;
</script>

<!--<Flatpickr
	placeholder="Publish Date"
	class="text-height mdc-text-field--outlined"
	element="#picker"
	{options}
	{value}
>
	<label
		id="picker"
		bind:this={el}
		class="pointer flatpickr mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon text-size"
	>
		<span class="mdc-notched-outline">
			<span class="mdc-notched-outline__leading" />
			<span class="mdc-notched-outline__notch">
				<span class="mdc-floating-label" id="my-label-id" />
			</span>
			<span class="mdc-notched-outline__trailing" />
		</span>
		<input
			type="text"
			class="mdc-text-field__input"
			aria-labelledby="my-label-id"
			required
			data-input
		/>
		<i
			class="material-icons icon-color mdc-text-field__icon mdc-text-field__icon--trailing"
			tabindex="-1"
			aria-hidden="true"
			role="button"
			data-toggle
		>
			date_range
		</i>
	</label>
	<HelperText persistent>Publish Date *</HelperText>
</Flatpickr>-->
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

<style lang="scss" global>
	//@import 'flatpickr/dist/flatpickr.css';

	/*.mdc-text-field__input::-webkit-calendar-picker-indicator {
		display: initial;
	}*/

	.pointer {
		cursor: pointer !important;
	}
	.text-size {
		width: 100% !important;
	}
	.space {
		margin: 0 5px 0 5px;
	}
	.text-height {
		height: 50px;
	}
</style>
