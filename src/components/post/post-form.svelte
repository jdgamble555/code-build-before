<script lang="ts">
	import MarkdownEditor from '$lib/form/markdown-editor.svelte';
	import type { Optional, Post } from '$lib/post.model';
	import Card, { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Icon from '@smui/textfield/icon';
	import IconButton from '@smui/icon-button';
	import ChipsInput from '$lib/form/chips-input.svelte';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	import PostDetail from './post-detail.svelte';
	import { auth, edit_post, image_upload } from '$lib/database';
	import { goto } from '$app/navigation';
	import Button from '@smui/button/src/Button.svelte';
	import { form, field } from 'svelte-forms';
	import { required, min } from 'svelte-forms/validators';
	import DatePicker from '$lib/form/date-picker.svelte';
	import { tagsMin, tagsRequired } from '$lib/form/chips-validate';
	import PostCoverImage from './post-cover-image.svelte';
	import { isValidURL } from '$lib/utils';
	import { dialogStore, imageUploads } from '$lib/stores';
	import { debounce } from '$lib/debounce';

	const { setPost } = edit_post;
	const { user } = auth;
	const { uploadImage } = image_upload;

	export let post: Post;

	imageUploads.set(post.imageUploads || []);

	let id = post.id === '0x0' ? undefined : post.id;

	let active = 'Content';

	let imageFile: Optional<File>;

	// form functions and validation

	const content = field('content', post.content, [required(), min(3)]);
	const tags = field('tags', post.tags, [tagsRequired(), tagsMin(2)]);
	const title = field('title', post.title, [required(), min(2)]);
	const publishedAt = field('publishedAt', new Date(post.publishedAt).toISOString(), [required()]);
	const image = field('image', post.image, [required()]);
	const postForm = form(image, content, tags, title, publishedAt);

	// auto save function

	type FormState = 'not-ready' | 'error' | 'saving' | 'synced';

	let state: FormState = 'not-ready';

	const _debounce = debounce(() => {
		if (isReady()) {
			saveForm();
		}
	}, 500);

	$: $postForm, _debounce();

	const isReady = () => {
		// if default state
		if (!$content.dirty && !$tags.dirty && !$title.dirty && !$image.dirty) {
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

		if (!isValidURL($image.value)) {
			const uid = $user.data && !$user.loading ? $user.data.id : null;

			// upload new image
			if (uid && imageFile) {
				const { url, error: _e } = await uploadImage(`cover_images/${uid}`, imageFile);
				if (_e) {
					console.error(_e);
				} else {
					image.set(url);
					imageFile = undefined;
					// setting new image will retrigger function
					return;
				}
			}
		}

		const _data = {
			...$postForm.summary,
			image: $image.value,
			author: !$user.loading ? $user.data : '',
			publishedAt: new Date($publishedAt.value),
			imageUploads: $imageUploads
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
				goto(`/p/${data.id}/${data.slug}`);
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
			<PostCoverImage {image} title={post.title} bind:imageFile />
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
			<DatePicker bind:value={$publishedAt.value} />
			{#if $postForm.hasError('publishedAt.required')}
				<HelperText class="red" persistent slot="helper">Published Date is required.</HelperText>
			{/if}
			<br />
			<br />
			<div class="flex-container">
				<div>
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

					<Button class="no-bold" type="submit" touch disabled={state === 'not-ready'}>
						<Label>
							{#if state === 'saving'}
								Saving Draft...
							{:else if state === 'not-ready'}
								Not Ready to Save
							{:else}
								Synced
							{/if}
						</Label>
					</Button>
				</div>
				<div>
					<IconButton
						class="material-icons"
						on:click={() => dialogStore.show(post.id, post.image, post.imageUploads)}
						title="Delete">delete</IconButton
					>
				</div>
			</div>
		{:else}
			<PostDetail post={{ ...post, ...$postForm.summary }} details preview isDraft />
		{/if}
	</Content>
</Card>
<br />

<style lang="scss">
	:global(.text-size) {
		width: 100% !important;
	}
	:global(.space) {
		margin: 0 5px 0 5px;
	}
	:global(.pointer) {
		cursor: pointer !important;
	}
	:global(.text-height) {
		height: 50px;
	}
</style>
