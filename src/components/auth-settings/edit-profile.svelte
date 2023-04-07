<script lang="ts">
	import Textfield from '@smui/textfield';
	import { auth_settings } from '$lib/database';
	import Button, { Label } from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import { createForm } from 'svelte-forms-lib';
	import { showMsg } from '$lib/stores';
	import { auth_settings_messages } from '$lib/messages';
	import EditImage from './edit-image.svelte';

	export let user: any;

	const { updateProfile } = auth_settings;

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			displayName: user.displayName
		},
		validate: async (values) => {
			const errs: { displayName?: string | undefined } = {};
			if (Object.hasOwn(values, 'displayName')) {
				if (values.displayName === '') {
					errs['displayName'] = 'Name is required.';
				} else if (values.displayName.length < 3) {
					errs['displayName'] = 'Your name must be at least 3 characters.';
				} else if (values.displayName === user.displayName) {
					errs['displayName'] = 'Must enter new name.';
				}
			}
			return Object.keys(errs).length ? errs : null;
		},
		onSubmit: (values) => {
			updateProfile({ displayName: values.displayName }).then(({ error }) => {
				if (!error) {
					showMsg(auth_settings_messages.DISPLAY_NAME_CHANGE);
				}
			});
		}
	});
</script>

<div class="accordian-container">
	<EditImage {user} />
	<form class:valid={$isValid} on:submit={handleSubmit}>
		<Textfield
			input$name="displayName"
			type="text"
			variant="outlined"
			class="text-size"
			input$autocomplete="name"
			placeholder="Name"
			label="Name"
			bind:value={$form.displayName}
			on:input={handleChange}
			required
		>
			<Icon class="material-icons icon-color" slot="leadingIcon">person</Icon>
		</Textfield>
		{#if $errors.displayName && $touched.displayName}
			<br />
			<span class="error"><small>{$errors.displayName}</small></span>
		{/if}
		<br />
		<Button
			color="primary"
			class="item-space"
			aria-label="Save"
			title="Save"
			disabled={!$isValid || !$touched.displayName}
		>
			<Icon class="material-icons">save</Icon>
			<Label><span class="no-bold">Save</span></Label>
		</Button>
	</form>
</div>

<style>
	:global(.text-size) {
		width: 100% !important;
	}
	:global(.item-space) {
		margin: 20px 0 20px 0;
	}
	.error {
		color: red;
	}
</style>
