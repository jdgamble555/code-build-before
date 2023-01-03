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
	import { auth, edit_post } from '$lib/database';
	import { goto } from '$app/navigation';
	import Button from '@smui/button/src/Button.svelte';
	import { form, field } from 'svelte-forms';
	import { required, min } from 'svelte-forms/validators';
	import DatePicker from '$lib/form/date-picker.svelte';
	import { tagsMin, tagsRequired } from '$lib/form/chips-validate';
	import PostCoverImage from './post-cover-image.svelte';

	const { setPost } = edit_post;
	const { user } = auth;

	export let post: Post;

	let id = post.id === '0x0' ? undefined : post.id;

	let active = 'Content';

	// form functions and validation

	const content = field('content', post.content, [required(), min(3)]);
	const tags = field('tags', post.tags, [tagsRequired(), tagsMin(2)]);
	const title = field('title', post.title, [required(), min(2)]);
	const date = field('publishedAt', new Date(post.publishedAt).toISOString());
	const postForm = form(content, tags, title, date);

	// auto save function

	type FormState = 'not-ready' | 'error' | 'saving' | 'synced';

	let state: FormState = 'not-ready';
	let timer: NodeJS.Timer;

	$: $postForm,
		(() => {
			// debounce
			clearTimeout(timer);
			timer = setTimeout(() => {
				// save draft data if ready
				if (isReady()) {
					saveForm();
				}
			}, 500);
		})();

	const isReady = () => {
		// if default state
		if (!$content.dirty && !$tags.dirty && !$title.dirty) {
			return false;
		}
		// if empty values
		if (!$content.value || !$title.value || $tags.value.length === 0) {
			return false;
		}
		// else run validation and check for errors
		postForm.validate();
		if ($postForm.errors.length === 0) {
			return true;
		}
		return false;
	};

	const saveForm = async (publish = false) => {
		state = 'saving';

		const _data = {
			...$postForm.summary,
			author: $user !== 'loading' ? $user : '',
			publishedAt: new Date(new Date($date.value).setHours(5))
		};

		// add post to db
		const { data, error } = await setPost(_data as any, id, publish);

		if (error) {
			state = 'error';
			console.error(error);
		}
		if (data && !error) {
			id = data?.id;
			state = 'synced';
			if (publish) {
				goto(`/${data.id}/${data.slug}`);
			}
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
			<PostCoverImage />
			<div class="vertical-space" />
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
			{:else if $postForm.hasError('title.min')}
				<HelperText class="red" persistent slot="helper">
					Title must be at least 2 characters long.
				</HelperText>
			{/if}
			<div class="vertical-space" />
			<MarkdownEditor bind:source={$content.value} />
			{#if $postForm.hasError('content.required')}
				<HelperText class="red" persistent slot="helper">Post Content is Required.</HelperText>
			{:else if $postForm.hasError('content.min')}
				<HelperText class="red" persistent slot="helper">
					Post Content must be at least 3 characters long.
				</HelperText>
			{/if}
			<br />
			<ChipsInput label="Tags" placeholder="Tags" bind:input={$tags.value} />
			{#if $postForm.hasError('tags.required')}
				<HelperText class="red" persistent slot="helper">Tags are required.</HelperText>
			{:else if $postForm.hasError('tags.min')}
				<HelperText class="red" persistent slot="helper">You must have at least 2 tags.</HelperText>
			{/if}
			<div class="vertical-space" />
			<DatePicker bind:value={$date.value} />
			<br />
			<Button
				class="no-bold"
				type="submit"
				color="secondary"
				touch
				variant="outlined"
				disabled={state === 'not-ready'}
			>
				<Label>
					{#if state === 'saving'}
						Saving Draft...
					{:else if state === 'not-ready'}
						Not Ready to Save
					{:else}
						Save
					{/if}
				</Label>
			</Button>
			<span class="space" />
			<Button
				on:click={() => saveForm(true)}
				class="no-bold"
				type="submit"
				color="secondary"
				touch
				variant="outlined"
				disabled={state !== 'synced'}
			>
				<Label>Publish</Label>
			</Button>
		{:else}
			<PostDetail {post} details preview />
		{/if}
	</Content>
</Card>
<br />

<style lang="scss" global>
	.text-size {
		width: 100% !important;
	}
	.space {
		margin: 0 5px 0 5px;
	}
</style>
