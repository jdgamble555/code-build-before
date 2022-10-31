<script lang="ts">
	import TopAppBar, { Row } from '@smui/top-app-bar';
	import Section from '@smui/top-app-bar/src/Section.svelte';
	import IconButton from '@smui/icon-button';
	import { showSearch } from '$lib/stores';
	import Autocomplete from '@smui-extra/autocomplete';
	import { Text } from '@smui/list';
	import CircularProgress from '@smui/circular-progress';

	let fruits = [
		'Apple',
		'Orange',
		'Banana',
		'Mango',
		'Lemon',
		'Cherry',
		'Blueberry',
		'Grape',
		'Strawberry'
	];
	let value: string | undefined = undefined;

	let counter = 0;

	async function searchItems(input: string) {
		if (input === '') {
			return [];
		}

		// Pretend to have some sort of canceling mechanism.
		const myCounter = ++counter;

		// Pretend to be loading something...
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// This means the function was called again, so we should cancel.
		if (myCounter !== counter) {
			// `return false` (or, more accurately, resolving the Promise object to
			// `false`) is how you tell Autocomplete to cancel this search. It won't
			// replace the results of any subsequent search that has already finished.
			return false;
		}

		// Return a list of matches.
		return fruits.filter((item) => item.toLowerCase().includes(input.toLowerCase()));
	}
</script>

<TopAppBar class="top-search-color" variant="fixed">
	<div class="row">
		<Row>
			<Section class="search-button" align="start" toolbar>
				<IconButton
					on:click={() => showSearch.update((m) => !m)}
					class="material-icons button-color"
					aria-label="Search"
					title="Search"
				>
					search
				</IconButton>
			</Section>
			<Section>
				<Autocomplete
					class="auto-complete"
					search={searchItems}
					bind:value
					showMenuWithNoInput={false}
					textfield$input$placeholder="Search"
					textfield$input$class="text-height"
				>
					<Text slot="loading">
						<CircularProgress style="height: 24px; width: 24px;" indeterminate />
					</Text>
				</Autocomplete>
			</Section>
			<Section class="search-button" align="end" toolbar>
				<IconButton
					on:click={() => showSearch.update((m) => !m)}
					class="material-icons button-color"
					aria-label="Search"
					title="Search"
				>
					close
				</IconButton>
			</Section>
		</Row>
	</div>
</TopAppBar>

<style global>
	.text-height {
		margin-top: 10px !important;
	}
	.top-search-color {
		background-color: #fafafa !important;
	}
	.button-color {
		color: #000 !important;
	}
	.search-button {
		max-width: 50px;
	}
	.auto-complete {
		width: 100% !important;
		margin-bottom: 30px !important;
	}
	.row {
		margin: 0px 10px 0 10px;
	}
	.mdc-text-field {
		width: 100% !important;
	}
</style>
