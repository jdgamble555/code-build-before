<script lang="ts">
	import TopAppBar, { Row } from '@smui/top-app-bar';
	import Section from '@smui/top-app-bar/src/Section.svelte';
	import IconButton from '@smui/icon-button';
	import { showSearch } from '$lib/stores';
	import Autocomplete from '@smui-extra/autocomplete';
	import { Text } from '@smui/list';
	import CircularProgress from '@smui/circular-progress';
	import { read_post } from '$lib/database';
	import type { Post } from '$lib/post.model';
	import { goto } from '$app/navigation';

	let value: { id?: string; label?: string; slug?: string } | undefined = undefined;
	let options: Post[] = [];

	async function searchItems(input: string) {
		const { searchPost } = read_post;

		// Return a list of matches.
		let r = await searchPost(input);
		if (!r) {
			return false;
		} else {
			options = r;
			return r.map((p) => ({ id: p.id, label: p.title, slug: p.slug }));
		}
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
					getOptionLabel={(option) => (option ? option.label : '')}
					bind:value
					showMenuWithNoInput={false}
					textfield$input$placeholder="Search"
					textfield$input$class="text-height"
					on:SMUI:action={() => {
						if (value) {
							goto(`/p/${value.id}/${value.slug}`);
							value = {};
						}
					}}
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
