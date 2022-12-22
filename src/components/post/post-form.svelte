<script lang="ts">
	import MarkdownEditor from '$lib/markdown/markdown-editor.svelte';
	import type { Post } from '$lib/post.model';
	import Card, { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import { createForm } from 'svelte-forms-lib';
	import '@github/markdown-toolbar-element';
	import ChipsInput from '$lib/form/chips-input.svelte';

	export let post: Post;

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			title: post.title,
			tags: post.tags || []
		},
		onSubmit: (values) => {}
	});
</script>

<svelte:head />

<br />

<Card variant="outlined" padded>
	<h1>{post ? 'Edit' : 'New'} Post</h1>
	<Content>
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
			input$autofocus
			required
		>
			<Icon class="material-icons icon-color" slot="leadingIcon">title</Icon>
		</Textfield>
		<!--<SvelteMarkdown source={post.content} />-->
		<br />
		<br />
		<MarkdownEditor source={post.content} />
	</Content>
</Card>
<br />
<ChipsInput label="Tags" placeholder="Tags" bind:input={$form.tags} />

<style global>
	.text-size {
		width: 100% !important;
	}
</style>
