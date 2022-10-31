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

<TopAppBar color="secondary" variant="fixed">
	<div class="row">
		<Row>
			<Section>
				<div class="auto-complete">
					<Autocomplete
						class="auto-complete"
						search={searchItems}
						bind:value
						showMenuWithNoInput={false}
						label="Fruit"
					>
						<Text slot="loading">
							<CircularProgress style="height: 24px; width: 24px;" indeterminate />
						</Text>
					</Autocomplete>
				</div>
			</Section>
			<Section class="end-button" align="end" toolbar>
				<IconButton
					on:click={() => showSearch.update((m) => !m)}
					class="material-icons"
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
    .end-button {
        max-width: 50px;
    }
	.auto-complete {
		width: 100% !important;
	}
	.row {
		margin: 0px 10px 0 10px;
	}
    .mdc-text-field {
        width: 100% !important;
    }
</style>
