<script lang="ts">
	import Textfield from '@smui/textfield';
	import { auth_settings } from '$lib/database';
	import Button, { Label } from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import { createForm } from 'svelte-forms-lib';
	import { showMsg } from '$lib/stores';
	import { auth_settings_messages } from '$lib/messages';

	export let username: string;

	const { updateUsername, validUsername } = auth_settings;

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			username
		},
		validate: async (values) => {
			const errs: { username?: string | undefined } = {};
			if (Object.hasOwn(values, 'username')) {
				if (values.username === '') {
					errs['username'] = 'Username is required.';
				} else if (values.username.length < 3) {
					errs['username'] = 'Your username must be at least 3 characters.';
				} else if (values.username === username) {
					errs['username'] = 'Must enter new username.';
				} else if (!(await validUsername(values.username))) {
					errs['username'] = 'Username is taken.';
				}
			}
			return Object.keys(errs).length ? errs : null;
		},
		onSubmit: (values) => {
			updateUsername(values.username).then(({ error }) => {
				if (!error) {
					showMsg(auth_settings_messages.USERNAME_CHANGE);
				}
			});
		}
	});
</script>

<div class="accordian-container">
	<form class:valid={$isValid} on:submit={handleSubmit}>
		<Textfield
			input$name="username"
			type="text"
			variant="outlined"
			class="text-size"
			input$autocomplete="username"
			placeholder="Username"
			label="Username"
			bind:value={$form.username}
			on:input={handleChange}
			required
		>
			<Icon class="material-icons icon-color" slot="leadingIcon">person</Icon>
		</Textfield>
		{#if $errors.username && $touched.username}
			<br />
			<span class="error"><small>{$errors.username}</small></span>
		{/if}
		<br />
		<Button
			variant="outlined"
			color="primary"
			class="item-space"
			aria-label="Save"
			title="Save"
			disabled={!$isValid || !$touched.username}
		>
			<Icon class="material-icons">save</Icon>
			<Label><span class="no-bold">Save</span></Label>
		</Button>
	</form>
</div>

<style global>
	.text-size {
		width: 100% !important;
	}
	.item-space {
		margin: 20px 0 20px 0;
	}
	.error {
		color: red;
	}
</style>
