<script lang="ts">
	import TextField from '@smui/textfield';
	import Chip, { Set, Text, TrailingAction } from '@smui/chips';

	export let input: string[] = [];
	export let name = '';
	export let label = '';
	export let placeholder = label;

	let value = ' ';

	const handleKey = (e: CustomEvent) => {
		const event = e as unknown as KeyboardEvent;

		// remove value with backspace
		if (event.key === 'Backspace') {
			if (value === '') input.pop();
		}

		// add value with enter, space, or comma
		if (['Enter', ' ', ','].includes(event.key)) {
			if (input.includes(value.trim())) {
				value = '';
				return;
			}
			if (event.key === ',') {
				value = value.slice(0, -1);
			}
			input.push(value.trim());
			value = '';
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
	bind:value
	on:keyup={handleKey}
>
	<Set class="set" chips={input} let:chip>
		<Chip {chip}>
			<Text>{chip}</Text>
			<TrailingAction icon$class="material-icons white">close</TrailingAction>
		</Chip>
	</Set>
</TextField>

<style global>
	.set {
		flex-wrap: nowrap !important;
	}
</style>
