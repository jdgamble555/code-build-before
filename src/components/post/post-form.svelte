<script lang="ts">
	import MarkdownEditor from '$lib/markdown/markdown-editor.svelte';
	import type { Post } from '$lib/post.model';
	import Card, { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import { createForm } from 'svelte-forms-lib';
	import ChipsInput from '$lib/form/chips-input.svelte';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	import PostDetail from './post-detail.svelte';

	export let post: Post;

	let active = 'Content';

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: post,
		onSubmit: (values) => {}
	});
</script>

<svelte:head />

<br />

<Card variant="outlined" padded>
	<TabBar tabs={['Content', 'Preview']} let:tab bind:active>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	<br />
	<Content>
		{#if active === 'Content'}
			<Textfield
				input$name="title"
				type="text"
				variant="outlined"
				class="text-size"
				input$autocomplete="name"
				placeholder="Title"
				label="Title"
				bind:value={$form.title}
				on:input={handleChange}
				required
			>
				<Icon class="material-icons icon-color" slot="leadingIcon">title</Icon>
			</Textfield>
			<br />
			<br />
			<MarkdownEditor bind:source={$form.content} />
			<br />
			<ChipsInput label="Tags" placeholder="Tags" bind:input={$form.tags} />
		{:else}
			<PostDetail {post} details preview />
		{/if}
	</Content>
</Card>
<br />

<style global>
	.text-size {
		width: 100% !important;
	}
</style>
