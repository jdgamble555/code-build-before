<script lang="ts">
	import MarkdownEditor from '$lib/markdown/markdown-editor.svelte';
	import type { Post } from '$lib/post.model';
	import Card, { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Icon from '@smui/textfield/icon';
	import ChipsInput from '$lib/form/chips-input.svelte';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	import PostDetail from './post-detail.svelte';
	import { DateInput } from 'date-picker-svelte';
	import { auth, edit_post } from '$lib/database';
	import { goto } from '$app/navigation';
	import Button from '@smui/button/src/Button.svelte';
	import { form, field } from 'svelte-forms';
	import { required, min } from 'svelte-forms/validators';

	const { setPost } = edit_post;
	const { user } = auth;

	export let post: Post;

	// form functions and validation

	function tagsRequired() {
		return (value: string) => ({ valid: value.length > 0, name: 'required' });
	}

	function tagsMin(n: number) {
		return (value: string) => ({ valid: value.length >= n, name: 'min' });
	}

	const content = field('content', post.content, [required(), min(3)]);
	const tags = field('tags', post.tags, [tagsRequired(), tagsMin(2)]);
	const title = field('title', post.title, [required(), min(2)]);
	const postForm = form(content, tags, title);

	// auto save function

	let timer: NodeJS.Timer;

	$: $postForm,
		(() => {
			// debounce
			clearTimeout(timer);
			timer = setTimeout(() => {
				console.log($postForm.summary);
			}, 500);
		})();

	let date = new Date(post.publishedAt);

	let active = 'Content';

	const submitForm = async (e: SubmitEvent) => {
		const values = post;
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
			//goto(`/${post.id}/${values.slug}`);
		}
	};
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
				bind:value={$title.value}
				required
			>
				<Icon class="material-icons icon-color" slot="leadingIcon">title</Icon>
			</Textfield>
			{#if $postForm.hasError('title.required')}
				<HelperText class="red" persistent slot="helper">Title is Required.</HelperText>
			{/if}
			{#if $postForm.hasError('title.min') && !$postForm.hasError('title.required')}
				<HelperText class="red" persistent slot="helper">
					Title must be at least 2 characters long.
				</HelperText>
			{/if}
			<br />
			<br />
			<DateInput bind:value={date} />
			<br />
			<br />
			<MarkdownEditor bind:source={$content.value} />
			{#if $postForm.hasError('content.required')}
				<HelperText class="red" persistent slot="helper">Post Content is Required.</HelperText>
			{/if}
			{#if $postForm.hasError('content.min') && !$postForm.hasError('content.required')}
				<HelperText class="red" persistent slot="helper">
					Post Content must be at least 3 characters long.
				</HelperText>
			{/if}
			<br />
			<ChipsInput label="Tags" placeholder="Tags" bind:input={$tags.value} />
			{#if $postForm.hasError('tags.required')}
				<HelperText class="red" persistent slot="helper">Tags are required.</HelperText>
			{/if}
			{#if $postForm.hasError('tags.min') && !$postForm.hasError('tags.required')}
				<HelperText class="red" persistent slot="helper">You must have at least 2 tags.</HelperText>
			{/if}
			<br />
			<br />
			<Button type="submit" color="secondary" touch variant="outlined"><Label>Save</Label></Button>
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
