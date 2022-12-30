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
	//import SveltyPicker from 'svelty-picker';
	import { DateInput } from 'date-picker-svelte';
	import { auth, edit_post } from '$lib/database';
	import { goto } from '$app/navigation';
	import Button from '@smui/button/src/Button.svelte';

	const { setPost } = edit_post;

	const { user } = auth;

	export let post: Post;

	let date = new Date(post.publishedAt);

	let active = 'Content';

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			...post,
			publishedAt: new Date(post.publishedAt)
		},
		onSubmit: async (values) => {
			const publish = true;
			const id = post.id === '0x0' ? undefined : post.id;

			const { id: _id, ...data } = {
				...values,
				uid: $user !== 'loading' ? $user?.id : '',
				publishedAt: new Date(new Date(date).setHours(5))
			};

			// add post to db
			const { data: _data, error: e3 } = await setPost(data as any, id, publish);

			if (e3) {
				console.error(e3);
			}

			if (publish && !e3) {
				goto(`/${post.id}/${values.slug}`);
			}
		}
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
			<form on:submit={handleSubmit}>
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
				<DateInput bind:value={date} />
				<br />
				<br />
				<MarkdownEditor bind:source={$form.content} />
				<br />
				<ChipsInput label="Tags" placeholder="Tags" bind:input={$form.tags} />
				<br />
				<br />
				<Button type="submit" color="secondary" touch variant="outlined"><Label>Save</Label></Button
				>
			</form>
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
