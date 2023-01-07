<script lang="ts">
	import TextField from '@smui/textfield';
	import Chip, { Set, Text, TrailingAction } from '@smui/chips';

	export let input: string[] = [];
	export let name = '';
	export let label = '';
	export let placeholder = label;

	let value = '';
	const setValue = () => (value = input.length ? ' ' : '');
	setValue();

	let newValue = '';

	const handleKey = (e: CustomEvent) => {
		const event = e as unknown as KeyboardEvent;

		// remove value with backspace
		if (event.key === 'Backspace') {
			if (value === '') {
				input.pop();
			}
			setValue();
		}

		// add value with enter, space, or comma
		if (['Enter', ' ', ','].includes(event.key)) {
			newValue = value.trim();

			// handle no previous values and , enter or space
			if (newValue === ',' || newValue === '') {
				setValue();
				return;
			}

			// remove comma from chip
			if (event.key === ',') {
				newValue = newValue.slice(0, -1);
			}

			// prevent duplicates
			if (input.includes(newValue)) {
				setValue();
				return;
			}

			input.push(newValue);
			setValue();
		}
		// save new value
		input = input;
	};
</script>

<TextField
	input$name={name}
	type="text"
	variant="outlined"
	class="text-size"
	{placeholder}
	{label}
	required
	bind:value
	on:keyup={handleKey}
>
	<Set class="no-flex-wrap" chips={input} let:chip>
		<Chip {chip}>
			<Text>{chip}</Text>
			<TrailingAction
				on:click={() => {
					// remove value
					value = input.length === 1 ? '' : ' ';
				}}
				icon$class="material-icons white">close</TrailingAction
			>
		</Chip>
	</Set>
</TextField>
