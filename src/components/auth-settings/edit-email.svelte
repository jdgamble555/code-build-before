<script lang="ts">
	import Textfield from '@smui/textfield';
	import { auth_settings } from '$lib/database';
	import Button, { Label } from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import { createForm } from 'svelte-forms-lib';
	import { validEmail } from '$lib/email-validation';
	import { showMsg } from '$lib/stores';
	import { auth_settings_messages } from '$lib/messages';
	import { goto } from '$app/navigation';

	export let email: string;

	const { updateEmail } = auth_settings;

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			email
		},
		validate: (values) => {
			const errs: { email?: string | undefined } = {};
			if (Object.hasOwn(values, 'email')) {
				if (values.email === '') {
					errs['email'] = 'Email is required.';
				} else if (!validEmail.test(values.email)) {
					errs['email'] = 'Invalid Email.';
				} else if (values.email === email) {
					errs['email'] = 'Must enter new email.';
				}
			}
			return Object.keys(errs).length ? errs : null;
		},
		onSubmit: (values) => {
			updateEmail(values.email).then(({ error }) => {
				if (!error) {
					showMsg(auth_settings_messages.EMAIL_CHANGE);
					goto('/');
				}
			});
		}
	});
</script>

<div class="accordian-container">
	<form class:valid={$isValid} on:submit={handleSubmit}>
		<Textfield
			input$name="email"
			type="email"
			variant="outlined"
			class="text-size"
			input$autocomplete="email"
			placeholder="Email"
			label="Email"
			bind:value={$form.email}
			on:input={handleChange}
			required
		>
			<Icon class="material-icons icon-color" slot="leadingIcon">email</Icon>
		</Textfield>
		{#if $errors.email && $touched.email}
			<br />
			<span class="error"><small>{$errors.email}</small></span>
		{/if}
		<br />
		<Button
			color="secondary"
			class="item-space"
			aria-label="Save"
			title="Save"
			disabled={!$isValid || !$touched.email}
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
</style>
