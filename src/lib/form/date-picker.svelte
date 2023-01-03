<script lang="ts">
	import Flatpickr from 'svelte-flatpickr';
	import type { BaseOptions } from 'flatpickr/dist/types/options';
	import HelperText from '@smui/textfield/helper-text';

	export let options: Partial<BaseOptions> = {
		enableTime: true,
		position: 'above'
	};
	export let value: string;

	let el: HTMLElement;

	//$: el ? new MDCTextField(el) : undefined;
</script>

<Flatpickr
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
</Flatpickr>

<style lang="scss" global>
	@import 'flatpickr/dist/flatpickr.css';

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
