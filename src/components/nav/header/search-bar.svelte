<script lang="ts">
	import TopAppBar, { Row } from '@smui/top-app-bar';
	import Section from '@smui/top-app-bar/src/Section.svelte';
	import IconButton from '@smui/icon-button';
	import { showSearch } from '$lib/stores';
	import Autocomplete from '@smui-extra/autocomplete';
	import { Text } from '@smui/list';
	import { read_post } from '$lib/database';
	import { goto } from '$app/navigation';
	import Loader from '../loader.svelte';
	import type { Post } from '$lib/post.model';

	let value: { id?: string; slug?: string } | undefined = undefined;

	let timer: NodeJS.Timeout;

	async function searchItems(input: string): Promise<false | Post[]> {
		const { searchPost } = read_post;
		if (!input) {
			return false;
		}
		// debounce
		clearTimeout(timer);

		return new Promise((res, _rej) => {
			let r: Post[] | null;
			timer = setTimeout(async () => {
				r = await searchPost(input);
				res(r || false);
			}, 500);
		});
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
					getOptionLabel={(option) => (option ? option.title : '')}
					bind:value
					showMenuWithNoInput={false}
					textfield$input$placeholder="Search"
					textfield$input$class="text-height"
					on:SMUI:action={() => {
						if (value) {
							goto(`/p/${value.id}/${value.slug}`);
						}
					}}
				>
					<Text slot="loading">
						<Loader />
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
